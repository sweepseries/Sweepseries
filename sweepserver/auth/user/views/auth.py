from typing import cast
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.utils import timezone
from dj_rest_auth.views import LoginView
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

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

        user = User.objects.get(username=request.data["username"])
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
