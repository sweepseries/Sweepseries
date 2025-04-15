from django.urls import path
from dj_rest_auth.views import LogoutView
from dj_rest_auth.jwt_auth import get_refresh_view
from rest_framework.routers import DefaultRouter

## Auth Apps
from auth.phoneverification.views import RequestVerificationCodeView, VerifyCodeView


router = DefaultRouter()

urlpatterns = [
    path("logout/", LogoutView.as_view(), name="logout"),
    path(
        "phone/code/",
        RequestVerificationCodeView.as_view(),
        name="verification_code",
    ),
    path("phone/code/verify/", VerifyCodeView.as_view(), name="verify_code"),
    path("tokens/refresh/", get_refresh_view().as_view(), name="token_refresh"),
]

urlpatterns += router.urls
