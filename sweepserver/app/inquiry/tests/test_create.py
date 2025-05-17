from rest_framework.test import APITestCase

from auth.user.models import User
from ..models import InquiryThread, InquiryMessage


class CreateInquiryAPITestCase(APITestCase):
    """
    1:1 문의 API 테스트 (POST)
        - 비고: 테스트 데이터에 있는 모든 약관은 2025-05-17에 생성, 최종 수정되었다.
    """

    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.url = "/v1/inquiries/"
        self.user = User.objects.get(username="testuser")
        self.data = {
            "title": "Test Inquiry",
            "content": "This is a test message.",
            "category": 0,
            "user": self.user.uuid,
        }
        self.invalid_uuid = "123e4567-e89b-12d3-a456-426614174999"

    def test_create_inquiry_success(self):
        ## 1. 로그인 된 유저
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(InquiryThread.objects.count(), 1)
        self.assertEqual(InquiryMessage.objects.count(), 1)
        inquiry_thread = InquiryThread.objects.first()
        self.assertEqual(inquiry_thread.user, self.user)
        self.assertEqual(inquiry_thread.name, self.user.person.name)
        self.assertEqual(inquiry_thread.email, self.user.email)

    def test_create_inquiry_anonymous_user(self):
        ## 1. 로그인 되지 않은 유저
        self.client.force_authenticate(user=None)
        data = {
            "title": "Test Inquiry",
            "content": "This is a test message.",
            "name": "Anonymous User",
            "email": "test@email.com",
            "category": 0,
        }
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(InquiryThread.objects.count(), 1)
        self.assertEqual(InquiryMessage.objects.count(), 1)
        inquiry_thread = InquiryThread.objects.first()
        self.assertEqual(inquiry_thread.name, "Anonymous User")
        self.assertEqual(inquiry_thread.email, "test@email.com")

    def test_create_inquiry_failure(self):
        self.client.force_authenticate(user=self.user)
        ## 1. user / name+email 둘 다 비어있음
        data = self.data.copy()
        data.pop("user")
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "이름과 이메일을 입력해주세요.")

        ## 2. uuid does not match
        data = {
            "title": "Test Inquiry",
            "content": "This is a test message.",
            "user": self.invalid_uuid,
        }
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")

        ## 3. category가 존재하지 않음
        data = {
            "title": "Test Inquiry",
            "content": "This is a test message.",
            "user": self.user.uuid,
            "category": "invalid_category",
        }
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")