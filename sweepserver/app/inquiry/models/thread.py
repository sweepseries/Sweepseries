from django.db import models

from auth.user.models import User
from core.models import TimeStampedModel
from .category import InquiryCategory
from .status import InquiryStatus


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

    category = models.ForeignKey(
        InquiryCategory,
        on_delete=models.PROTECT,
        related_name="inquiry_threads",
        default=1,
    )
    title = models.CharField(max_length=255)

    status = models.ForeignKey(
        InquiryStatus,
        on_delete=models.PROTECT,
        related_name="inquiry_threads",
        default=1,
    )

    objects = models.Manager()

    def __str__(self) -> str:
        return f"[#{self.pk}] {self.title}"

    class Meta:
        db_table = "inquiry_thread"
        verbose_name = "1:1 문의 스레드"
        verbose_name_plural = "1:1 문의 스레드"
        ordering = ["-created_at"]
