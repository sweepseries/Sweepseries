import sys
import traceback
from io import StringIO
from unittest.mock import patch

from django.http import HttpRequest, HttpResponse, Http404
from django.contrib.auth.models import AnonymousUser
from django.test import TestCase
from django.test.utils import override_settings

from rest_framework.test import APIRequestFactory

from core.middlewares import BadResponseMiddleware


class BadResponseMiddlewareTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.middleware = BadResponseMiddleware(get_response=lambda r: HttpResponse())
        self.request = self.factory.get('/test')
        self.request.user = AnonymousUser()
        self.request.path = '/test'
        self.request.method = 'GET'

    @override_settings(DEBUG=True)
    def test_process_exception_skip_logging(self):
        ## DEBUG 모드에서는 예외 로깅을 건너뛴다.
        with patch("core.middlewares.logger.error") as mock_logger:
            result = self.middleware.process_exception(self.request, ValueError("Test error"))

            # Because DEBUG=True, it returns None and never logs
            self.assertIsNone(result)
            mock_logger.assert_not_called()

    @override_settings(DEBUG=False)
    def test_process_exception_logs_error(self):
        ## DEBUG 모드가 아니고 sys.modules에 unittest가 없으면 예외를 로깅한다.
        exc = ValueError("production exception")

        original_unittest = sys.modules.pop("unittest", None)
        try:
            with patch("core.middlewares.logger.error") as mock_logger:
                result = self.middleware.process_exception(self.request, exc)

                mock_logger.assert_called_once()
                msg = mock_logger.call_args[0][0]
                self.assertIn("Unhandled Exception:", msg)
                self.assertIn(f"Path: {self.request.path}", msg)
                self.assertIn("Exception: production exception", msg)

                self.assertIsNone(result)
        finally:
            sys.modules["unittest"] = original_unittest

    @override_settings(DEBUG=False)
    def test_process_response_logs_error(self):
        ## DEBUG 모드가 아니고 sys.modules에 unittest가 없으면 응답 상태 코드가 400 이상일 때 로깅한다.
        response = HttpResponse(status=500, content="Internal Server Error")

        original_unittest = sys.modules.pop("unittest", None)
        try:
            with patch("core.middlewares.logger.error") as mock_logger:
                result = self.middleware.process_response(self.request, response)

                mock_logger.assert_called_once()
                msg = mock_logger.call_args[0][0]
                self.assertIn("Client/Server Error Response:", msg)
                self.assertIn(f"Status Code: {response.status_code}", msg)
                self.assertIn(f"Path: {self.request.path}", msg)
                self.assertIn(f"Method: {self.request.method}", msg)

                self.assertEqual(result, response)
        finally:
            sys.modules["unittest"] = original_unittest

    @override_settings(DEBUG=True)
    def test_process_response_skip_logging_debug(self):
        ## DEBUG 모드에서는 응답 상태 코드가 400 이상이어도 로깅을 건너뛴다.
        response = HttpResponse(status=500, content="Internal Server Error")

        with patch("core.middlewares.logger.error") as mock_logger:
            result = self.middleware.process_response(self.request, response)

            # Because DEBUG=True, it returns the original response and never logs
            self.assertEqual(result, response)
            mock_logger.assert_not_called()

    @override_settings(DEBUG=False)
    def test_process_response_skip_logging_unittest(self):
        ## status 코드가 400 이하면, 로깅을 건너뛴다.
        response = HttpResponse(status=200, content="OK")
        original_unittest = sys.modules.pop("unittest", None)
        try:
            with patch("core.middlewares.logger.error") as mock_logger:
                result = self.middleware.process_response(self.request, response)

                # Because status code is 200, it returns the original response and never logs
                self.assertEqual(result, response)
                mock_logger.assert_not_called()
        finally:
            sys.modules["unittest"] = original_unittest
