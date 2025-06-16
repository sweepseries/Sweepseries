from unittest.mock import patch
from django.test import TestCase
from django.utils import timezone

from community.forum.models import Forum, Tag
from community.profiles.models import CommunityProfile
from ..models import DailySequence, Post, PostImageAttachment, PostRead


class PostModelsTest(TestCase):
    fixtures = ["data/initial/forum.json", "data/test/auth.json"]

    @patch("django.utils.timezone.now")
    def test_daily_sequence_str(self, mock_now):
        mock_now.return_value = timezone.datetime(2025, 1, 1, 12, 0, 0)

        today = timezone.now().date()
        sequence = DailySequence.objects.create(date=today, last=1)
        self.assertEqual(str(sequence), "2025-01-01 - 1")

    def test_post_str(self):
        forum = Forum.objects.get(id=1)
        profile = CommunityProfile.objects.first()
        tag = Tag.objects.get(id=1)
        post = Post(
            id=1,
            forum=forum,
            author=profile,
            tag=tag,
            title="Test Post",
            content="This is a test post content.",
        )
        self.assertEqual(str(post), "(1) [덕아웃] - Test Post")

        attachment = PostImageAttachment(
            id=1,
            post=post,
            image="test_image.jpg",
        )
        self.assertEqual(str(attachment), "게시글 1 이미지 첨부")

        post_read = PostRead(
            id=1,
            post=post,
            user_profile=profile,
            last_read_at=timezone.now(),
        )
        self.assertEqual(str(post_read), "홍길동 read (1) [덕아웃] - Test Post")
