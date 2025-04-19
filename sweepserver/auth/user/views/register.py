from django.contrib.auth.password_validation import validate_password
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..validators import EmailValidator, UsernameValidator


class CheckUsernameEmailView(GenericAPIView):
    """
    아이디/이메일 중복 확인 API
        - url: POST /v1/check-username-email/
    """

    permission_classes = [AllowAny]
    http_method_names = ["post"]

    @extend_schema(summary="아이디/이메일 중복 확인", tags=["회원 관리"])
    def post(self, request, *args, **kwargs):
        # pylint: disable=unused-argument
        username = request.data.get("username", None)
        email = request.data.get("email", None)

        username_validator = UsernameValidator()
        email_validator = EmailValidator()

        username_validator(username)
        email_validator(email)

        return Response(status=status.HTTP_204_NO_CONTENT)
