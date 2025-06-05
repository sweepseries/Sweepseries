from django.db import models

from core.models import BaseChipModel


class InquiryStatus(BaseChipModel):
    """
    1:1 문의 상태 모델
    """

    objects = models.Manager()

    class Meta:
        db_table = "inquiry_status"
        verbose_name = "1:1 문의 상태"
        verbose_name_plural = "1:1 문의 상태"

    def __str__(self) -> str:
        return self.name
