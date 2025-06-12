from rest_framework.test import APITestCase

from auth.user.models import User


class ReadFAQsAPITestCase(APITestCase):
    """
    FAQ API 테스트 (GET)
        - 비고: 테스트 데이터에 있는 모든 약관은 2025-05-20에 생성, 최종 수정되었다.
    """

    fixtures = ["data/dev/faqs.json", "data/test/auth.json", "data/initial/faq.json"]

    def setUp(self):
        self.url = "/api/v1/faqs/"
        self.user = User.objects.get(username="testuser")

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
