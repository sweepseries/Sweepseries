from django.db import models

from core.models import TimeStampedModel


class Announcement(TimeStampedModel):
    title = models.CharField(max_length=255)
    content = models.TextField()

    is_important = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self) -> str:
        return self.title

    class Meta:
        db_table = "announcement"
        verbose_name = "공지사항"
        verbose_name_plural = "공지사항"
        ordering = ["-is_important", "is_deleted", "-created_at"]
