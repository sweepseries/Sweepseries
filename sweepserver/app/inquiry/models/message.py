from django.db import models

from auth.user.models import User
from core.models import TimeStampedModel
from .thread import InquiryThread


class InquiryMessageTypeChoices(models.IntegerChoices):
    USER = 1, "사용자"
    ADMIN = 2, "관리자"
    SYSTEM = 3, "시스템"


class InquiryMessage(TimeStampedModel):
    """
    1:1 문의 스레드 내 개별 메시지 (사용자 혹은 관리자)
    """

    thread = models.ForeignKey(
        InquiryThread, on_delete=models.CASCADE, related_name="messages"
    )
    sender = models.IntegerField(
        choices=InquiryMessageTypeChoices.choices,
        default=InquiryMessageTypeChoices.USER,
    )
    user = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="inquiry_messages",
    )
    # 비로그인 대비
    name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)

    content = models.TextField()
    is_read = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self) -> str:
        thread_id = self.thread.pk
        return f"[{thread_id}] {self.get_sender_display()}: {self.content[:20]}..."

    class Meta:
        db_table = "inquiry_message"
        verbose_name = "1:1 문의 메시지"
        verbose_name_plural = "1:1 문의 메시지"
        ordering = ["created_at"]  ## 최신 메시지가 위로 오도록 정렬
