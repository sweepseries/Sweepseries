from django.urls import path
from dj_rest_auth.views import LogoutView
from rest_framework.routers import DefaultRouter

## Apps
from app.announcement.views import AnnouncementViewSet
from app.faq.views import FAQViewSet
from app.inquiry.views import InquiryViewSet
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


## Community Apps
from community.views import CommunityInitializerView
from community.post.views import PostViewSet

router = DefaultRouter()

router.register(r"v1/announcements", AnnouncementViewSet, basename="announcements")
router.register(r"v1/faqs", FAQViewSet, basename="faqs")
router.register(r"v1/inquiries", InquiryViewSet, basename="inquiries")
router.register(r"v1/terms", ReadTermsView, basename="terms")

router.register(r"v1/posts", PostViewSet, basename="posts")

urlpatterns = [
    path("v1/initialize/", InitializerView.as_view(), name="initializer"),
    path("v1/register/", RegisterView.as_view(), name="register"),
    path("v1/login/social/", SocialLoginView.as_view(), name="kakao-login"),
    path("v1/login/", UserLoginView.as_view(), name="login"),
    path("v1/logout/", LogoutView.as_view(), name="logout"),
    path("v1/withdraw/", WithdrawalView.as_view(), name="withdrawal"),
    path("v1/terms_of_service/", TermsOfServiceView.as_view(), name="terms_of_service"),
    path("v1/privacy_policy/", PrivacyPolicyView.as_view(), name="privacy_policy"),
    path(
        "v1/check-username-email/", CheckUsernameEmailView.as_view(), name="check_username"
    ),
    path("v1/check-password/", CheckPasswordView.as_view(), name="check_password"),
    path(
        "v1/phone/code/",
        RequestVerificationCodeView.as_view(),
        name="verification_code",
    ),
    path("v1/phone/code/verify/", VerifyCodeView.as_view(), name="verify_code"),
    path("v1/tokens/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "v1/community/initialize/",
        CommunityInitializerView.as_view(),
        name="community_initialize",
    ),
]

urlpatterns += router.urls
