from django.test import TestCase

from ..models import InquiryThread, InquiryMessage, InquiryCategory, InquiryStatus


class InquiryModelsTestCase(TestCase):
    def test_str(self):
        cat = InquiryCategory.objects.create(name="General Inquiry")
        self.assertEqual(str(cat), "General Inquiry")

        sta = InquiryStatus.objects.create(name="Open")
        self.assertEqual(str(sta), "Open")

        inquiry_thread = InquiryThread.objects.create(
            name="Test User",
            email="test@email.com",
            title="Test Inquiry",
        )
        self.assertEqual(str(inquiry_thread), "[#1] Test Inquiry")

        inquiry_message = InquiryMessage.objects.create(
            thread=inquiry_thread,
            content="This is a test message.",
        )
        self.assertEqual(str(inquiry_message), "[1] 사용자: This is a test messa...")
