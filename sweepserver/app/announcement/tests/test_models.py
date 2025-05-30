from django.test import TestCase

from ..models import Announcement


class AnnouncementModelsTestCase(TestCase):
    """
    공지사항 모델 테스트
    """

    fixtures = ["data/dev/announcement.json"]

    def test_announcement_str(self):
        announcement = Announcement.objects.get(id=1)
        self.assertEqual(str(announcement), "Catch B 출시 이벤트!")
