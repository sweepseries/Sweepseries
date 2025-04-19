from rest_framework import status
from rest_framework.test import APITestCase

from auth.person.models import Person
from ..models import User


class CheckUsernameEmailAPITestCase(APITestCase):
    def setUp(self):
        self.url = "/v1/check-username-email/"
        person = Person.objects.create(
            name="Existing User", phone_number="+821012345678"
        )
        User.objects.create(
            username="existinguser", email="existing@email.com", person=person
        )

    def test_check_username_email_success(self):
        response = self.client.post(
            self.url, {"username": "testuser", "email": "email@email.com"}
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_check_username_fail(self):
        email = "email@email.com"
        ## 1. no data
        response = self.client.post(self.url, {"username": "", "email": email})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "아이디를 입력해주세요.")

        ## 2. already exists
        response = self.client.post(
            self.url, {"username": "existinguser", "email": email}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "이미 사용 중인 아이디입니다.")

        ## 3. special characters
        response = self.client.post(self.url, {"username": "testuser@", "email": email})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"], "아이디는 영문과 숫자만 사용 가능합니다."
        )

        ## 4. length
        response = self.client.post(self.url, {"username": "a", "email": email})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"], "아이디는 4자 이상 150자 이하여야 합니다."
        )

    def test_check_email_fail(self):
        username = "testuser"
        ## 1. no data
        response = self.client.post(self.url, {"username": username, "email": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "이메일을 입력해주세요.")

        ## 2. already exists
        response = self.client.post(
            self.url, {"username": username, "email": "existing@email.com"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "이미 사용중인 이메일입니다.")

        ## 3. invalid format
        response = self.client.post(
            self.url, {"username": username, "email": "invalid-email"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "올바른 이메일 형식이 아닙니다.")
