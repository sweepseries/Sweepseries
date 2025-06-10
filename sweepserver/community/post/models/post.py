from django.db import models, transaction
from django.utils import timezone

from community.forum.models import Forum, Tag
from community.profiles.models import CommunityProfile
from core.models import TimeStampedModel


class DailySequence(models.Model):
    """
    일자별 시퀀스 모델
    이 모델은 매일의 시퀀스 번호를 관리합니다.
    """

    date = models.DateField(primary_key=True)
    last = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "daily_sequence"
        verbose_name = "일일 시퀀스"
        verbose_name_plural = "일일 시퀀스"

    def __str__(self):
        return f"{self.date} - {self.last}"


class Post(TimeStampedModel):
    id = models.BigIntegerField(primary_key=True)
    forum = models.ForeignKey(Forum, on_delete=models.PROTECT, related_name="posts")
    author = models.ForeignKey(
        CommunityProfile, on_delete=models.PROTECT, related_name="posts"
    )
    tag = models.ForeignKey(
        Tag, on_delete=models.SET_NULL, related_name="posts", null=True
    )

    title = models.CharField(max_length=40)
    content = models.TextField()

    num_views = models.PositiveIntegerField(default=0)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = models.Manager()

    def __str__(self):
        return f"({self.id}) [{self.forum.name}] - {self.title}"

    def save(self, *args, **kwargs):
        if not self.id:
            today = timezone.localdate()

            with transaction.atomic():
                seq, _ = DailySequence.objects.select_for_update().get_or_create(
                    date=today
                )
                seq.last += 1
                seq.save()

                prefix = int(today.strftime("%Y%m%d"))
                self.id = prefix * 10**6 + seq.last

        super().save(*args, **kwargs)

    class Meta:
        db_table = "community_post"
        verbose_name = "커뮤니티 게시글"
        verbose_name_plural = "커뮤니티 게시글"
        ordering = ["-created_at"]
        unique_together = ("forum", "author", "title")


class PostImageAttachment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField()

    is_deleted = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return f"게시글 {self.post.id} 이미지 첨부"

    class Meta:
        db_table = "community_post_image"
        verbose_name = "커뮤니티 게시글 이미지"
        verbose_name_plural = "커뮤니티 게시글 이미지"
