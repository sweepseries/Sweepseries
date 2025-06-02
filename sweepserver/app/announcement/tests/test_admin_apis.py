from rest_framework import status

from core.tests import AdminPageAPITestCase
from ..models import Announcement


class AdminAnnouncementAPITestCase(AdminPageAPITestCase):
    """
    공지사항 관리 API 테스트
    """

    fixtures = AdminPageAPITestCase.fixtures + ["data/dev/announcement.json"]

    def setUp(self):
        super().setUp()
        self.url = "/api/admin/v1/announcements/"
        self.create_data = {
            "title": "새로운 공지사항",
            "content": "공지사항 내용",
            "is_important": True,
        }

    def test_list_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_retrieve_success(self):
        self.client.force_authenticate(user=self.admin)
        announcement = Announcement.objects.first()
        response = self.client.get(
            f"{self.url}{announcement.id}/", HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], announcement.id)

    def test_create_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(
            self.url, data=self.create_data, HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        announcement = Announcement.objects.get(id=response.data["id"])
        self.assertEqual(announcement.title, self.create_data["title"])
        self.assertEqual(announcement.content, self.create_data["content"])

    def test_create_failure(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(self.url, data={}, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "제목을 입력해주세요.")

    def test_delete_success(self):
        self.client.force_authenticate(user=self.admin)
        announcement = Announcement.objects.first()
        response = self.client.delete(
            f"{self.url}{announcement.id}/", HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        announcement.refresh_from_db()
        self.assertTrue(announcement.is_deleted)

    def test_reactivate_success(self):
        self.client.force_authenticate(user=self.admin)
        announcement = Announcement.objects.first()
        announcement.is_deleted = True
        announcement.save()

        response = self.client.post(
            f"{self.url}{announcement.id}/reactivate/", HTTP_ORIGIN=self.admin_page
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        announcement.refresh_from_db()
        self.assertFalse(announcement.is_deleted)
