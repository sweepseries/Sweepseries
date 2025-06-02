from rest_framework import status

from core.tests import AdminPageAPITestCase
from ..models import FAQ


class AdminFAQAPITestCase(AdminPageAPITestCase):
    """
    FAQ 관리 API 테스트
    """

    fixtures = AdminPageAPITestCase.fixtures + ["data/dev/faqs.json"]

    def setUp(self):
        super().setUp()
        self.url = "/api/admin/v1/faqs/"
        self.create_data = {
            "category": 1,
            "question": "새로운 FAQ 질문",
            "answer": "FAQ 답변 내용",
        }

    def test_list_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)
