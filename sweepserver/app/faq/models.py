from django.db import models

from core.models import BaseChipModel


class FAQCategory(BaseChipModel):
    objects = models.Manager()

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = "faq_category"
        verbose_name = "FAQ 카테고리"
        verbose_name_plural = "FAQ 카테고리"
        ordering = ["id"]


class FAQ(models.Model):
    category = models.ForeignKey(
        FAQCategory, on_delete=models.CASCADE, related_name="faqs"
    )
    question = models.CharField(max_length=255)
    answer = models.TextField()

    is_active = models.BooleanField(default=True)

    objects = models.Manager()

    def __str__(self) -> str:
        return f"{self.category.name} - {self.question}"

    class Meta:
        db_table = "faq"
        verbose_name = "자주 묻는 질문"
        verbose_name_plural = "자주 묻는 질문"
        ordering = ["is_active", "id"]
