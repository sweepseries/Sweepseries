from rest_framework import status

from core.tests import AdminPageAPITestCase
from ..models import TermsAndConditions, TermsAndConditionsHistory


class AdminTermsAPITestCase(AdminPageAPITestCase):
    """
    약관 관리 API 테스트
    """

    fixtures = AdminPageAPITestCase.fixtures + ["data/dev/terms.json"]

    def setUp(self):
        super().setUp()
        self.url = "/api/admin/v1/terms/"
        self.create_data = {
            "title": "새로운 약관",
            "content": "약관 내용",
            "is_required": True,
        }

    def test_unallowed_methods(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(f"{self.url}1/", {}, HTTP_ORIGIN=self.admin_page)
        # print(response.data)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(
            response.data["error"],
            "이 API는 사용하지 않습니다. 대신, `content` 액션을 사용하세요.",
        )

    def test_list_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

        ## coverage for has_content
        term = TermsAndConditions.objects.get(id=1)
        term.content = ""
        term.save()

        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

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

        ## coverage for has_content
        term = TermsAndConditionsHistory.objects.get(id=1)
        term.content = ""
        term.save()
        response = self.client.get(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_detail_fail(self):
        ## no version
        TermsAndConditionsHistory.objects.filter(terms_id=1).delete()
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(
            self.url, self.create_data, HTTP_ORIGIN=self.admin_page
        )
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
        response = self.client.post(
            self.url, self.create_data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_destroy_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.delete(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        term = TermsAndConditions.objects.get(id=1)
        self.assertFalse(term.is_active)

    def test_reactivate_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(
            f"{self.url}1/reactivate/", HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        term = TermsAndConditions.objects.get(id=1)
        self.assertTrue(term.is_active)
        self.assertEqual(term.order, 5)

    def test_content_update_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(
            f"{self.url}1/content/",
            {"version_id": 1, "content": "업데이트된 약관 내용"},
            HTTP_ORIGIN=self.admin_page,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        term = TermsAndConditions.objects.get(id=1)
        self.assertEqual(term.content, "업데이트된 약관 내용")

    def test_content_update_failure(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(
            f"{self.url}1/content/",
            {"version_id": 2, "content": "업데이트된 약관 내용"},
            HTTP_ORIGIN=self.admin_page,
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "해당 약관의 최신 버전이 아닙니다.")
