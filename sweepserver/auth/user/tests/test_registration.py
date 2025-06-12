from unittest.mock import MagicMock, patch
import requests
from rest_framework import status
from rest_framework.test import APITestCase

from community.profiles.models import CommunityProfile
from ..models import User


class RegisterAPITestCase(APITestCase):
    def setUp(self):
        self.url = "/api/v1/register/"
        self.common_data = {
            "username": "testuser",
            "email": "test@email.com",
            "name": "Test User",
            "phone": "010-1234-5678",
            "gender": "남성",
            "birth_year": "1990",
            "birth_month": "01",
            "birth_day": "01",
            "nickname": "testnickname",
            "profile_image": "",
            "route": "catchb",
        }
        self.catchb_data = {
            **self.common_data,
            "mode": "catchb",
            "password": "testpassword123!",
            "password2": "testpassword123!",
            "notifications": True,
        }
        self.kakao_data = {
            **self.common_data,
            "mode": "kakao",
            "notifications": True,
        }
        self.naver_data = {
            **self.common_data,
            "mode": "naver",
            "notifications": False,
        }

    def test_bad_register_mode(self):
        data = self.common_data.copy()
        data["mode"] = "invalid_mode"
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")

    def test_catchb_register_success(self):
        response = self.client.post(self.url, self.catchb_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username=self.catchb_data["username"])
        self.assertEqual(user.person.phone_number, "+821012345678")
        self.assertEqual(user.notification_agreed, True)
        self.assertIsNotNone(user.notification_agreed_at)
        self.assertGreater(CommunityProfile.objects.count(), 0)

    def test_catchb_register_fail(self):
        ## 1. no passwords
        data = self.catchb_data.copy()
        data["password"] = ""
        data["password2"] = ""
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "비밀번호를 입력해주세요.")

        ## 2. passwords not match
        data = self.catchb_data.copy()
        data["password"] = "testpassword123!"
        data["password2"] = "testpassword123"
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "비밀번호가 일치하지 않습니다.")

        ## 3. bad birthday data
        data = self.catchb_data.copy()
        data["birth_year"] = "asdf"
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "생년월일 형식이 올바르지 않습니다.")

        ## 4. invalid gender
        data = self.catchb_data.copy()
        data["gender"] = "invalid"
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "오류가 발생했습니다.")

    def test_kakao_register_success(self):
        ## 1. kakao login
        ## - gender: Female, nickname: None
        ## - with invalid profile_image url => should be ignored
        data = self.kakao_data.copy()
        data["gender"] = "여성"
        data["nickname"] = None
        data["profile_image"] = "test_image.jpg"
        data["route"] = "kakao"
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username=self.kakao_data["username"])
        self.assertEqual(user.notification_agreed, True)
        self.assertGreater(CommunityProfile.objects.count(), 0)

    @patch("auth.user.serializers.register.default_storage")
    @patch("auth.user.serializers.register.requests.get")
    def test_naver_register_success_with_profile_image(self, mock_get, mock_storage):
        ## 1. naver login
        ## - without notifications, gender: Other
        mock_res = MagicMock()
        mock_res.status_code = 200
        mock_res.headers = {"Content-Type": "image/jpeg"}
        mock_res.content = b"test_image_content"
        mock_get.return_value = mock_res

        mock_s3_client = MagicMock()
        mock_storage.connection.meta.client = mock_s3_client

        fake_bucket = MagicMock()
        fake_bucket.name = "test-bucket"
        mock_storage.bucket = fake_bucket

        expected_path = "users/1/profiles/test1.jpg"
        fake_url = f"https://test.com/{expected_path}"
        mock_storage.url.return_value = fake_url

        data = self.naver_data.copy()
        data["notifications"] = False
        data["gender"] = "기타"
        data["profile_image"] = "https://sweepserver.com/media/test_image.jpg"
        data["route"] = "naver"
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username=self.naver_data["username"])
        self.assertEqual(user.notification_agreed, False)
        self.assertGreater(CommunityProfile.objects.count(), 0)

    @patch("auth.user.serializers.register.requests.get")
    def test_profile_image_request_fail(self, mock_get):
        ## 1. request fail (+ no gender)
        mock_get.side_effect = requests.RequestException()

        data = self.naver_data.copy()
        data["gender"] = ""
        data["profile_image"] = "https://sweepserver.com/media/test_image.jpg"
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @patch("auth.user.serializers.register.requests.get")
    def test_profile_image_not_image(self, mock_get):
        ## 2. bad content type (+ no birthday)
        mock_res = MagicMock()
        mock_res.status_code = 200
        mock_res.headers = {"Content-Type": "text/html"}
        mock_get.return_value = mock_res

        data = self.naver_data.copy()
        data["birth_year"] = ""
        data["birth_month"] = ""
        data["birth_day"] = ""
        data["gender"] = None
        data["profile_image"] = "https://sweepserver.com/media/test_image.jpg"
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
