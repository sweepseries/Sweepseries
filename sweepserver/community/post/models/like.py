from django.db import models

from community.profiles.models import CommunityProfile
from .post import Post


class PostLike(models.Model):
    """
    게시글 좋아요 모델
    사용자가 게시글에 좋아요를 눌렀을 때 기록된다.
    """

    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    user_profile = models.ForeignKey(
        CommunityProfile, on_delete=models.CASCADE, related_name="post_likes"
    )
    liked_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()

    class Meta:
        db_table = "post_like"
        verbose_name = "게시글 좋아요"
        verbose_name_plural = "게시글 좋아요"
        unique_together = ("post", "user_profile")

    def __str__(self):
        return f"{self.user_profile.profile_name} liked {self.post}"
