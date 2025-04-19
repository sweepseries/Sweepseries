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


class CheckPasswordView(GenericAPIView):
    """
    비밀번호 확인 API
        - url: POST /v1/check-password/
    """

    permission_classes = [AllowAny]
    http_method_names = ["post"]

    @extend_schema(summary="비밀번호 확인", tags=["회원 관리"])
    def post(self, request):
        password = request.data.get("password", None)
        password2 = request.data.get("password2", None)
        if not password or not password2:
            raise ValidationError("비밀번호를 입력해주세요.")
        if password != password2:
            raise ValidationError("비밀번호가 일치하지 않습니다.")

        # 비밀번호 유효성 검사
        # settings.AUTH_PASSWORD_VALIDATORS에 정의된 유효성 검사기를 사용
        # .validators에 있는 검사도 자동으로 포함된다
        validate_password(password)

        return Response(status=status.HTTP_204_NO_CONTENT)
