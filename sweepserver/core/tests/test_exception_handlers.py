from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.test import APITestCase

from core.exceptions import get_drf_api_error_response


class CustomExceptionHandlerTestCase(APITestCase):
    def test_token_expiration(self):
        ## placeholder test
        exc = APIException(
            detail={
                "code": "token_not_valid",
                "messages": [{"token_type": "access"}],
            },
        )
        exc.status_code = status.HTTP_401_UNAUTHORIZED

        response = get_drf_api_error_response(exc)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data, {"error": "Access Token이 만료되었습니다."})
