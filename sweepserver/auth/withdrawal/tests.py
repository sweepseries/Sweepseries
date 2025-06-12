from datetime import date
from rest_framework import status
from rest_framework.test import APITestCase

from auth.user.models import User


class WithdrawalAPITestCase(APITestCase):
    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.url = "/api/v1/withdraw/"
        self.user = User.objects.get(username="testuser")
        self.data = {
            "reason": 1,
            "reason_text": "이용하지 않음...",
            "uuid": self.user.uuid,
        }
        self.client.force_authenticate(user=self.user)

    def test_withdrawal(self):
        ## 1. normal
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_withdrawal_2(self):
        ## 2. person with birth_date & naver id & kakao id
        birth_date = date(1990, 1, 1)
        self.user.person.birth_date = birth_date
        self.user.naver_id = "naver_id"
        self.user.kakao_id = "kakao_id"
        self.user.person.save()
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_withdrawal_fail(self):
        ## 1. invalid reason
        data = self.data.copy()
        data["reason"] = 100

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"], "유효하지 않은 사유입니다."
        )

        ## 2. invalid reason_text
        data = self.data.copy()
        data["reason_text"] = "Too short"
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"], "상세 사유는 최소 10자 이상이어야 합니다."
        )

        ## 3. no uuid
        data = self.data.copy()
        data.pop("uuid")
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        ## 4. uuid mismatch
        data = self.data.copy()
        data["uuid"] = "invalid_uuid"
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
