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
            "category_id": 1,
            "question": "새로운 FAQ 질문",
            "answer": "FAQ 답변 내용",
        }

    def test_list_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_retrieve_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("question", response.data)
        self.assertIn("answer", response.data)

    def test_create_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(
            self.url, data=self.create_data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["question"], self.create_data["question"])
        self.assertEqual(response.data["answer"], self.create_data["answer"])
        self.assertEqual(response.data["category"]["name"], "이벤트")
        self.assertTrue(response.data["is_active"])

    def test_delete_and_reactivate_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.delete(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        faq = FAQ.objects.get(id=1)
        self.assertFalse(faq.is_active)

        response = self.client.post(
            f"{self.url}1/reactivate/", HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        faq = FAQ.objects.get(id=1)
        self.assertTrue(faq.is_active)
