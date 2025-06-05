from rest_framework.test import APITestCase

from auth.user.models import User


class ReadInquiriesAPITestCase(APITestCase):
    """
    1:1 문의 API 테스트 (GET)
        - 비고: 테스트 데이터에 있는 모든 약관은 2025-05-17에 생성, 최종 수정되었다.
    """

    fixtures = [
        "data/test/inquiries.json",
        "data/test/auth.json",
        "data/initial/inquiry.json",
    ]

    def setUp(self):
        self.url = "/v1/inquiries/"
        self.user = User.objects.get(username="testuser")

    def test_list(self):
        ## 1. 로그인 된 유저
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

        ## 2. 로그인 되지 않은 유저
        self.client.force_authenticate(user=None)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)
