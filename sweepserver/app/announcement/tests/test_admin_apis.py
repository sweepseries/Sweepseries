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
            "is_active": True,
        }

    def test_list_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)
