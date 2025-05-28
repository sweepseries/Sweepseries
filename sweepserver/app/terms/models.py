from django.db import models

from core.models import TimeStampedModel


class TermsAndConditions(TimeStampedModel):
    order = models.PositiveIntegerField(default=0)
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    is_required = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self) -> str:
        return f"{self.order}. {self.title}"

    class Meta:
        db_table = "terms"
        verbose_name = "약관"
        verbose_name_plural = "약관"
        ordering = ["order"]


class TermsAndConditionsHistory(TimeStampedModel):
    terms = models.ForeignKey(
        TermsAndConditions, on_delete=models.CASCADE, related_name="history"
    )
    content = models.TextField(blank=True)
    update_summary = models.TextField()

    is_admin_only = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self) -> str:
        return f"{self.terms.title} - {self.created_at.strftime('%Y-%m-%d')}"

    class Meta:
        db_table = "terms_history"
        verbose_name = "약관 이력"
        verbose_name_plural = "약관 이력"
