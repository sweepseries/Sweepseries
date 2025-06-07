from django.test import TestCase

from auth.user.models import User
from ..models import (
    InquiryThread,
    InquiryMessage,
    InquiryAdminNote,
    InquiryCategory,
    InquiryStatus,
)


class InquiryModelsTestCase(TestCase):
    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.cat = InquiryCategory.objects.create(name="General Inquiry")
        self.sta = InquiryStatus.objects.create(name="Open")
        self.user = User.objects.get(username="testuser")
        self.inquiry_thread = InquiryThread.objects.create(
            user=self.user,
            title="Test Inquiry",
        )
        self.inquiry_message = InquiryMessage.objects.create(
            thread=self.inquiry_thread,
            content="This is a test message.",
        )
        self.inquiry_note = InquiryAdminNote.objects.create(
            thread=self.inquiry_thread,
            admin=self.user,
            content="This is a test note.",
        )

    def test_str(self):
        self.assertEqual(str(self.cat), "General Inquiry")

        self.assertEqual(str(self.sta), "Open")

        self.assertEqual(str(self.inquiry_thread), "[#1] Test Inquiry")

        self.assertEqual(
            str(self.inquiry_message), "[1] 사용자: This is a test messa..."
        )

        self.assertEqual(str(self.inquiry_note), "[1] testuser: This is a test note....")
