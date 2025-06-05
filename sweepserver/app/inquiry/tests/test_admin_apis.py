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

    def test_list_success(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url, HTTP_ORIGIN=self.admin_page)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)
