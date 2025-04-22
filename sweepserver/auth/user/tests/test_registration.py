from rest_framework import status
from rest_framework.test import APITestCase

from ..models import User


class RegisterAPITestCase(APITestCase):
    def setUp(self):
        self.url = "/v1/register/"
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
        }
        self.catchb_data = {
            **self.common_data,
            "mode": "catchb",
            "password": "testpassword123!",
            "password2": "testpassword123!",
            "notifications": True,
        }

    def test_catchb_register_success_with_noti(self):
        response = self.client.post(self.url, self.catchb_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username=self.catchb_data["username"])
        self.assertEqual(user.person.phone_number, "+821012345678")
        self.assertEqual(user.notification_agreed, True)
        self.assertIsNotNone(user.notification_agreed_at)

    def test_catchb_register_success_without_noti(self):
        ## and gender = "여성"
        ## and empty birthday data
        ## and empty nickname
        data = self.catchb_data.copy()
        data["notifications"] = False
        data["gender"] = "여성"
        data["birth_year"] = ""
        data["birth_month"] = ""
        data["birth_day"] = ""
        data["nickname"] = None
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username=data["username"])
        self.assertEqual(user.person.phone_number, "+821012345678")
        self.assertEqual(user.notification_agreed, False)
        self.assertIsNone(user.notification_agreed_at)

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
