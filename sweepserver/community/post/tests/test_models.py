from unittest.mock import patch
from django.test import TestCase
from django.utils import timezone

from ..models import DailySequence  ##, Post, PostImageAttachment,


class PostModelsTest(TestCase):
    @patch("django.utils.timezone.now")
    def test_daily_sequence_str(self, mock_now):
        mock_now.return_value = timezone.datetime(2025, 1, 1, 12, 0, 0)

        today = timezone.now().date()
        sequence = DailySequence.objects.create(date=today, last=1)
        self.assertEqual(str(sequence), "2025-01-01 - 1")
