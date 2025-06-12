from django.conf import settings
from rest_framework import status
from rest_framework.test import APITestCase

from auth.person.models import Person
from ..models import User
from ..views.auth import get_tokens_for_user


class LoginAPITestCase(APITestCase):
    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.url = "/api/v1/login/"
        user_person = Person.objects.create(
            name="Test User", phone_number="010-1234-5678"
        )
        self.user = User.objects.create_user(
            username="user",
            email="us@er.com",
            password="user123!",
            is_superuser=False,
            person=user_person,
        )
        self.user.kakao_id = "kakao_id"
        self.user.naver_id = "naver_id"
        self.user.save()

    def test_login(self):
        ## 1. normal from mobile app
        custom_header = {
            "X-Sweep-Platform": "sweep/mobile",
        }
        response = self.client.post(
            self.url,
            {"username": "user", "password": "user123!"},
            headers=custom_header,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNot(response.data.get("refresh"), "")

        ## 2. normal from web
        response = self.client.post(
            self.url, {"username": "user", "password": "user123!"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get("refresh"), "")

    def test_login_as_admin(self):
        ## 1. success
        response = self.client.post(
            self.url,
            {"username": "admin", "password": "admin123!"},
            HTTP_ORIGIN=settings.ADMIN_PAGE_URL,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get("refresh"), "")

        ## 2. failure
        response = self.client.post(
            self.url,
            {"username": "Test User", "password": "user123!"},
            HTTP_ORIGIN=settings.ADMIN_PAGE_URL,
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_social_login(self):
        ## 1. naver
        response = self.client.post(
            "/api/v1/login/social/", {"username": "naver_id", "mode": "naver"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. kakao
        response = self.client.post(
            "/api/v1/login/social/", {"username": "kakao_id", "mode": "kakao"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_social_login_fail(self):
        ## 1. invalid mode
        response = self.client.post(
            "/api/v1/login/social/", {"username": "kakao_id", "mode": "invalid"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 2. no data
        response = self.client.post("/api/v1/login/social/", {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")

        ## 3. empty data
        response = self.client.post(
            "/api/v1/login/social/", {"username": "", "mode": ""}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")

        ## 4. no username in database
        response = self.client.post(
            "/api/v1/login/social/", {"username": "username", "mode": "naver"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["result"], "NOT_REGISTERED")


class TokenRefreshAPITestCase(APITestCase):
    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.url = "/api/v1/tokens/refresh/"
        self.user = User.objects.get(username="testuser")

    def test_token_refresh(self):
        ## 1. normal
        tokens = get_tokens_for_user(self.user)
        response = self.client.post(
            self.url,
            {"refresh": tokens["refresh"]},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_token_refresh_fail(self):
        ## 1. normal
        response = self.client.post(
            self.url,
            {"refresh": "12341234"},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
