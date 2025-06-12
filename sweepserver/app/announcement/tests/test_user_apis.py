from rest_framework import status
from rest_framework.test import APITestCase

class AnnouncementAPITestCase(APITestCase):
    """
    공지사항 API 테스트
    """

    fixtures = ["data/dev/announcement.json"]

    def setUp(self):
        self.url = "/api/v1/announcements/"

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve(self):
        response = self.client.get(self.url + "1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Catch B 출시 이벤트!")
