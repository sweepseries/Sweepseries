from rest_framework import status

from core.tests import AdminPageAPITestCase
from ..models import TermsAndConditionsHistory


class AdminTermsAPITestCase(AdminPageAPITestCase):
    """
    약관 관리 API 테스트
    """

    fixtures = AdminPageAPITestCase.fixtures + ["data/test/terms.json"]

    def setUp(self):
        super().setUp()
        self.url = "/api/admin/v1/terms/"
        self.create_data = {
            "title": "새로운 약관",
            "content": "약관 내용",
            "is_required": True,
        }

    def test_list_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_list_unauthorized(self):
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.force_authenticate(user=None)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_detail_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], 1)

    def test_detail_fail(self):
        ## no version
        TermsAndConditionsHistory.objects.filter(terms_id=1).delete()
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(self.url, self.create_data, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], self.create_data["title"])
        self.assertTrue(response.data["is_active"])

    def test_create_fail(self):
        ## not authenticated
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.post(self.url, self.create_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## not admin page
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(self.url, self.create_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## missing required field
        self.create_data.pop("title")
        response = self.client.post(self.url, self.create_data, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
