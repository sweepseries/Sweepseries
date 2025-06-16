from django.db import models

from community.profiles.models import CommunityProfile
from .post import Post


class PostRead(models.Model):
    """
    게시글 읽음 기록 모델
    사용자가 게시글을 읽었을 때 기록된다.
    """

    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(
        CommunityProfile, on_delete=models.CASCADE, related_name="post_reads"
    )
    read_at = models.DateTimeField(auto_now_add=True)
    last_read_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    class Meta:
        db_table = "post_read"
        verbose_name = "게시글 읽음 기록"
        verbose_name_plural = "게시글 읽음 기록"
        unique_together = ("post", "user_profile")

    def __str__(self):
        return f"{self.user_profile.profile_name} read {self.post}"
