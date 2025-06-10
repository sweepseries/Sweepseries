from django.db import models

from community.profiles.models import CommunityProfile


class BaseLike(models.Model):
    """
    좋아요 추상 모델
    """

    user = models.ForeignKey(CommunityProfile, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
