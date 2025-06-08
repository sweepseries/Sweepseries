from django.db import models

from auth.user.models import User
from core.models import TimeStampedModel
from .thread import InquiryThread

class InquiryAdminNote(TimeStampedModel):
    """
    1:1 문의 스레드에 대한 관리자 노트
    """

    thread = models.ForeignKey(
        InquiryThread, on_delete=models.CASCADE, related_name="admin_notes"
    )
    admin = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="admin_notes",
    )
    content = models.TextField()

    objects = models.Manager()

    def __str__(self) -> str:
        return f"[{self.thread.pk}] {self.admin.username}: {self.content[:20]}..."

    class Meta:
        db_table = "inquiry_admin_note"
        verbose_name = "1:1 문의 관리자 노트"
        verbose_name_plural = "1:1 문의 관리자 노트"
        ordering = ["created_at"]
