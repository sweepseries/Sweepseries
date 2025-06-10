import uuid
from django.db import models

from auth.user.models import User
from core.models import TimeStampedModel


class CommunityProfile(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="community_profiles"
    )
    profile_name = models.CharField(max_length=255)
    profile_color = models.CharField(
        max_length=7, default="#FFFFFF"
    )  # Default to white
    profile_image = models.URLField(null=True)
    bio = models.TextField(blank=True)

    is_default = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    @property
    def is_active(self):
        return not (self.is_blocked or self.is_deleted)

    def __str__(self):
        return f"{self.user.username} - {self.profile_name}"

    class Meta:
        db_table = "community_profile"
        verbose_name = "커뮤니티 프로필"
        verbose_name_plural = "커뮤니티 프로필"
