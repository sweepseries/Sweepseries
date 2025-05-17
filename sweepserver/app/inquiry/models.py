from django.db import models

from auth.user.models import User
from core.models import TimeStampedModel
from .enums import (
    InquiryCategoryChoices,
    InquiryStatusChoices,
    InquiryMessageTypeChoices,
)


class InquiryThread(TimeStampedModel):
    """
    1:1 문의 한 건
    """

    ## 추후, 로그인 하지 않은 유저를 지원하기 위해, user가 null일 수 있도록 설정
    user = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="inquiry_threads",
    )
    # 비로그인 대비
    name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)

    category = models.IntegerField(
        choices=InquiryCategoryChoices.choices, default=InquiryCategoryChoices.OTHER
    )
    title = models.CharField(max_length=255)

    status = models.IntegerField(
        choices=InquiryStatusChoices.choices, default=InquiryStatusChoices.NEW
    )

    def __str__(self) -> str:
        return f"[#{self.pk}] {self.title}"

    class Meta:
        db_table = "inquiry_thread"
        verbose_name = "1:1 문의 스레드"
        verbose_name_plural = "1:1 문의 스레드"
        ordering = ["-created_at"]


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
        ordering = ["created_at"]
