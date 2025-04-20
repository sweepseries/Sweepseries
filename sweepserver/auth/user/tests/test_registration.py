from rest_framework import status
from rest_framework.test import APITestCase

from ..models import User


class RegisterAPITestCase(APITestCase):
    def setUp(self):
        self.url = "/v1/register/"
        self.catchb_data = {
            "mode": "catchb",
            "username": "testuser",
            "email": "test@email.com",
            "password": "testpassword123!",
            "password2": "testpassword123!",
            "name": "Test User",
            "phone": "010-1234-5678",
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
        data = self.catchb_data.copy()
        data["notifications"] = False
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
