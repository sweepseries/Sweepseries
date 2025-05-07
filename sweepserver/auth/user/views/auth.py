from typing import cast
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.utils import timezone
from dj_rest_auth.jwt_auth import (
    CookieTokenRefreshSerializer,
    set_jwt_access_cookie,
    set_jwt_refresh_cookie,
)
from dj_rest_auth.views import LoginView
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView as SimpleTokenRefreshView

from core.utils import is_admin_page
from ..models import User
from ..serializers import UserProfileSerializer


class UserLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        if is_admin_page(request):
            q = Q()
            q &= Q(username=request.data["username"], is_superuser=True)
            if not User.objects.filter(q).exists():
                return Response(
                    {"error": "관리자만 접근 가능합니다."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        response = super().post(request, *args, **kwargs)

        user = User.objects.get(username__iexact=request.data["username"])
        user.last_login = timezone.now()
        user.save()

        return process_response(request, response)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh = cast(RefreshToken, refresh)

    return {
        "refresh": str(refresh),
        "refresh_expiration": refresh.get("exp"),
        "access": str(refresh.access_token),
        "access_expiration": refresh.access_token.get("exp"),
        "result": "success",
    }


def process_response(request, response):
    user_agent = request.headers.get("X-Sweep-Platform", "")

    if user_agent not in ["sweep/mobile"]:
        ## remove refresh token
        response.data["refresh"] = ""

    return response


class SocialLoginView(APIView):
    def post(self, request, *args, **kwargs):  ## pylint: disable=unused-argument
        username = request.data.get("username", None)
        mode = request.data.get("mode", None)

        if not username or not mode:
            raise ValidationError("잘못된 요청입니다.")

        if mode == "kakao":
            q = Q(kakao_id=username, is_active=True, is_blocked=False)
        elif mode == "naver":
            q = Q(naver_id=username, is_active=True, is_blocked=False)
        else:
            raise ValidationError("잘못된 요청입니다.")

        try:
            user = User.objects.get(q)
        except ObjectDoesNotExist:
            return Response(
                data={
                    "result": "NOT_REGISTERED",
                },
                status=status.HTTP_200_OK,
            )

        data = get_tokens_for_user(user)
        user_serializer = UserProfileSerializer(user)

        user.last_login = timezone.now()
        user.save()

        data["user"] = user_serializer.data
        return Response(data, status=status.HTTP_200_OK)


class TokenRefreshView(SimpleTokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.status_code == status.HTTP_200_OK:
            ## 유저 정보 응답에 추가
            refresh_token_str = response.data["refresh"]
            token = RefreshToken(refresh_token_str)
            user = User.objects.get(uuid=token.payload.get("user_id"))

            user.last_login = timezone.now()
            user.save()

            user_serializer = UserProfileSerializer(user)
            response.data["user"] = user_serializer.data

            ## 토큰 만료 시간 추가
            set_jwt_access_cookie(response, response.data["access"])
            response.data["access_expiration"] = (
                timezone.now() + jwt_settings.ACCESS_TOKEN_LIFETIME
            )
            set_jwt_refresh_cookie(response, response.data["refresh"])
            response.data["refresh_expiration"] = (
                timezone.now() + jwt_settings.REFRESH_TOKEN_LIFETIME
            )

        return super().finalize_response(request, response, *args, **kwargs)
