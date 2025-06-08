from rest_framework import status

from core.tests import AdminPageAPITestCase
from ..models import InquiryThread


class AdminInquiryThreadAPITestCase(AdminPageAPITestCase):
    """
    1:1 문의 관리 API 테스트
    """

    fixtures = AdminPageAPITestCase.fixtures + [
        "data/test/inquiries.json",
        "data/initial/inquiry.json",
    ]

    def setUp(self):
        super().setUp()
        self.url = "/api/admin/v1/inquiries/"

    def test_unallowed_methods(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.patch(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_list_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_detail_success(self):
        self.client.force_authenticate(user=self.admin)
        ## already read
        response = self.client.get(f"{self.url}1/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("id", response.data)
        self.assertIn("title", response.data)
        self.assertIn("messages", response.data)

        ## toggle is_read
        response = self.client.get(f"{self.url}2/", HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_reply_success(self):
        self.client.force_authenticate(user=self.admin)
        data = {"content": "Test reply content"}
        response = self.client.post(
            f"{self.url}1/reply/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)
        self.assertIn("messages", response.data)

    def test_post_reply_fail(self):
        self.client.force_authenticate(user=self.admin)
        data = {"content": ""}
        response = self.client.post(
            f"{self.url}1/reply/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "답변 내용을 입력해주세요.")

    def test_post_notes_success(self):
        self.client.force_authenticate(user=self.admin)
        data = {"content": "Test note content"}
        response = self.client.post(
            f"{self.url}1/notes/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)
        self.assertIn("notes", response.data)

    def test_post_notes_fail(self):
        self.client.force_authenticate(user=self.admin)
        data = {"content": ""}
        response = self.client.post(
            f"{self.url}1/notes/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "노트 내용을 입력해주세요.")

    def test_patch_category_success(self):
        self.client.force_authenticate(user=self.admin)
        ## category doesn't change
        data = {"category_id": 1}
        response = self.client.patch(
            f"{self.url}1/category/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## category changes
        data = {"category_id": 2}
        response = self.client.patch(
            f"{self.url}1/category/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("id", response.data)
        self.assertIn("category", response.data)

    def test_patch_category_fail(self):
        self.client.force_authenticate(user=self.admin)
        data = {"category_id": "invalid"}
        response = self.client.patch(
            f"{self.url}1/category/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")

    def test_patch_status_success(self):
        self.client.force_authenticate(user=self.admin)
        ## status doesn't change
        data = {"status_id": 1}
        response = self.client.patch(
            f"{self.url}1/status/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## status changes
        data = {"status_id": 2}
        response = self.client.patch(
            f"{self.url}1/status/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("id", response.data)
        self.assertIn("status", response.data)

    def test_patch_status_fail(self):
        self.client.force_authenticate(user=self.admin)
        data = {"status_id": "invalid"}
        response = self.client.patch(
            f"{self.url}1/status/", data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")

    def test_more_cases(self):
        ## ONLY FOR COVERAGE
        self.client.force_authenticate(user=self.admin)
        inquiry = InquiryThread.objects.first()
        inquiry.messages.all().delete()

        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data["inquiries"][0]["is_read"])
