from django.db import models

from core.models import BaseChipModel


class InquiryCategory(BaseChipModel):
    """
    1:1 문의 카테고리 모델
    """

    order = models.PositiveIntegerField(default=0)

    objects = models.Manager()

    class Meta:
        db_table = "inquiry_category"
        verbose_name = "1:1 문의 카테고리"
        verbose_name_plural = "1:1 문의 카테고리"
        ordering = ["order"]

    def __str__(self) -> str:
        return self.name
