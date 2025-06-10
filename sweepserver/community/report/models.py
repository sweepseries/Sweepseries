from django.db import models

from community.profiles.models import CommunityProfile
from core.models import BaseChipModel, TimeStampedModel


class ReportReason(models.TextChoices):
    INSULT = "IN", "욕설/비방"
    VIOLENCE = "VI", "폭력/협박/위협"
    PORN = "PO", "음란물"
    UNTRUTHFUL = "UN", "거짓/허위정보"
    AD = "AD", "도배/스팸/광고"
    PERSONAL_INFO = "PI", "개인정보 침해"
    POLITICAL = "PL", "정치적인 내용"
    WRONG_CATEGORY = "WC", "잘못된 게시판/태그"
    OTHER = "OT", "기타"


class ReportStatus(BaseChipModel):
    """
    신고 상태 모델
    """

    objects = models.Manager()

    class Meta:
        db_table = "report_status"
        verbose_name = "신고 상태"
        verbose_name_plural = "신고 상태"

    def __str__(self) -> str:
        return self.name


class BaseReport(TimeStampedModel):
    """
    신고 추상 모델
    """

    report_user = models.ForeignKey(
        CommunityProfile, on_delete=models.CASCADE, related_name="reports"
    )
    report_content = models.TextField()
    report_reason = models.CharField(
        max_length=2, choices=ReportReason.choices, default=ReportReason.OTHER
    )
    report_status = models.ForeignKey(
        ReportStatus, on_delete=models.PROTECT, related_name="reports"
    )

    admin_note = models.TextField(blank=True)

    class Meta:
        abstract = True
