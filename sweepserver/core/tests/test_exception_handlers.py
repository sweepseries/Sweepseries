from io import StringIO
from unittest.mock import MagicMock, patch
from django.http import Http404
from django.test.utils import override_settings
from rest_framework import status
from rest_framework.exceptions import APIException, ValidationError
from rest_framework.test import APIRequestFactory, APITestCase

from core.exceptions import custom_exception_handler


class CustomExceptionHandlerTestCase(APITestCase):
    def setUp(self):
        self.context = MagicMock()

    def test_token_expiration(self):
        ## placeholder test
        exc = APIException(
            detail={
                "code": "token_not_valid",
                "messages": [{"token_type": "access"}],
            },
        )
        exc.status_code = status.HTTP_401_UNAUTHORIZED

        response = custom_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data, {"error": "Access Token이 만료되었습니다."})

    def test_unexpected_drf_validation_error(self):
        exc = ValidationError(detail=[{"foo": "bar"}])

        response = custom_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "오류가 발생했습니다."})

    def test_default_drf_error(self):
        exc = Http404("Not Found")
        factory = APIRequestFactory()
        request = factory.get("/test")
        self.context = {"request": request}

        response = custom_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_server_error(self):
        exc = ValueError("An unexpected error occurred")
        factory = APIRequestFactory()
        request = factory.get("/test")
        self.context = {"request": request}

        response = custom_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

    @override_settings(DEBUG=True)
    def test_debug_prints_exception(self):
        exc = ValueError("An unexpected error occurred")

        buf = StringIO()
        with patch("sys.stdout", buf):
            response = custom_exception_handler(exc, self.context)

        self.assertIsNotNone(response)
