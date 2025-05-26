from rest_framework import status

from core.tests import AdminPageAPITestCase


class AdminTermsAPITestCase(AdminPageAPITestCase):
    """
    약관 관리 API 테스트
    """

    fixtures = AdminPageAPITestCase.fixtures + ["data/test/terms.json"]

    def setUp(self):
        super().setUp()
        self.url = "/api/admin/v1/terms/"

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
