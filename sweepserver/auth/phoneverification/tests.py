import json
from unittest.mock import patch
import requests_mock
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from auth.person.models import Person
from .models import PhoneVerification


class PhoneNumberCodeRequestAPITestCase(APITestCase):
    def setUp(self):
        self.url = "/v1/phone/code/"
        self.phone_number = "010-1234-1234"

    @requests_mock.Mocker()
    def test_create_code_success(self, m):
        result = {"result_code": 1}
        m.post(
            "https://apis.aligo.in/send/",
            status_code=200,
            content=json.dumps(result).encode("utf-8"),
        )
        response = self.client.post(self.url, {"phone": self.phone_number})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_create_code_fail_invalid(self):
        ## 1. no data
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "전화번호를 입력해주세요.")

        ## 2. empty phone number
        response = self.client.post(self.url, {"phone": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "전화번호를 입력해주세요.")

        ## 3. invalid phone number
        response = self.client.post(self.url, {"phone": "010-1234"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "올바른 전화번호 형식이 아닙니다.")

        ## 4. invalid phone number
        response = self.client.post(self.url, {"phone": "01012341234"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "올바른 전화번호 형식이 아닙니다.")

    def test_create_code_fail_already_exists(self):
        Person.objects.create(phone_number=self.phone_number, name="홍길동")

        ## 1. already exists
        response = self.client.post(self.url, {"phone": self.phone_number})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "이미 가입된 전화번호입니다.")

    @requests_mock.Mocker()
    def test_create_code_fail_aligo(self, m):
        ## 1. aligo error
        m.post("https://apis.aligo.in/send/", status_code=500)
        response = self.client.post(self.url, {"phone": self.phone_number})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "인증번호 발송에 실패했습니다.")

        ## 2. bad request to aligo
        result = {"result_code": 0}
        m.post(
            "https://apis.aligo.in/send/",
            status_code=200,
            content=json.dumps(result).encode("utf-8"),
        )
        response = self.client.post(self.url, {"phone": self.phone_number})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "인증번호 발송에 실패했습니다.")


class PhoneNumberVerificationAPITestCase(APITestCase):
    def setUp(self):
        self.url = "/v1/phone/code/verify/"
        self.phone_number = "010-1234-1234"
        self.verification_code = "123456"
        self.verification_code_obj = PhoneVerification.objects.create(
            phone_number=self.phone_number,
            verification_code=self.verification_code,
        )

    def test_verify_code_success(self):
        response = self.client.post(
            self.url, {"phone": self.phone_number, "code": self.verification_code}
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    @patch("django.utils.timezone.now")
    def test_verify_code_fail(self, mock_now):
        ## 1. no data
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "전화번호와 인증번호를 입력해주세요.")

        ## 2. empty fields
        response = self.client.post(self.url, {"phone": "", "code": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "전화번호와 인증번호를 입력해주세요.")

        ## 3. invalid phone number
        response = self.client.post(
            self.url, {"phone": "010-1234", "code": self.verification_code}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "인증번호를 찾을 수 없습니다.")

        ## 4. invalid verification code
        response = self.client.post(
            self.url, {"phone": self.phone_number, "code": "111111"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "인증번호가 일치하지 않습니다.")

        ## 5. expired verification code
        mock_now.return_value = (
            self.verification_code_obj.created_at + timezone.timedelta(seconds=300)
        )
        response = self.client.post(
            self.url, {"phone": self.phone_number, "code": self.verification_code}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "인증번호가 만료되었습니다.")
