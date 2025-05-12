from django.urls import path
from dj_rest_auth.views import LogoutView
from rest_framework.routers import DefaultRouter

## Apps
from app.terms.views import PrivacyPolicyView, TermsOfServiceView, ReadTermsView
from app.views import InitializerView

## Auth Apps
from auth.phoneverification.views import RequestVerificationCodeView, VerifyCodeView
from auth.user.views import (
    CheckUsernameEmailView,
    CheckPasswordView,
    RegisterView,
    UserLoginView,
    SocialLoginView,
    TokenRefreshView,
)
from auth.withdrawal.views import WithdrawalView


router = DefaultRouter()

router.register(r"terms", ReadTermsView, basename="terms")

urlpatterns = [
    path("initialize/", InitializerView.as_view(), name="initializer"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/social/", SocialLoginView.as_view(), name="kakao-login"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("withdraw/", WithdrawalView.as_view(), name="withdrawal"),
    path("terms_of_service/", TermsOfServiceView.as_view(), name="terms_of_service"),
    path("privacy_policy/", PrivacyPolicyView.as_view(), name="privacy_policy"),
    path(
        "check-username-email/", CheckUsernameEmailView.as_view(), name="check_username"
    ),
    path("check-password/", CheckPasswordView.as_view(), name="check_password"),
    path(
        "phone/code/",
        RequestVerificationCodeView.as_view(),
        name="verification_code",
    ),
    path("phone/code/verify/", VerifyCodeView.as_view(), name="verify_code"),
    path("tokens/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
