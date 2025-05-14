from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from core.models import TimeStampedModel
from .enums import InquiryCategoryChoices, InquiryStatusChoices


class Inquiry(TimeStampedModel):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = PhoneNumberField(unique=True)

    category = models.CharField(
        max_length=50,
        choices=InquiryCategoryChoices.choices,
        default=InquiryCategoryChoices.OTHER,
    )
    title = models.CharField(max_length=255)
    content = models.TextField()

    status = models.CharField(
        max_length=50,
        choices=InquiryStatusChoices.choices,
        default=InquiryStatusChoices.PENDING,
    )
    is_read = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = "inquiry"
        verbose_name = "1:1 문의"
        verbose_name_plural = "1:1 문의"
        ordering = ["-created_at"]
