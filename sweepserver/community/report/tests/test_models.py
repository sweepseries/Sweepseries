from django.test import TestCase

from ..models import ReportStatus


class ReportModelsTest(TestCase):
    def setUp(self):
        self.status = ReportStatus.objects.create(name="Test Status")

    def test_report_status_str(self):
        self.assertEqual(str(self.status), "Test Status")
