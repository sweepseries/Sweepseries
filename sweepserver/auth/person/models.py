from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class GenderChoices(models.TextChoices):
    UNDEFINED = "U", "미입력"
    MALE = "M", "남성"
    FEMALE = "F", "여성"
    OTHER = "O", "기타"


class Person(models.Model):
    name = models.CharField(max_length=150, blank=True)
    phone_number = PhoneNumberField(unique=True)

    birth_date = models.DateField(null=True)
    gender = models.CharField(
        max_length=1, choices=GenderChoices.choices, default=GenderChoices.UNDEFINED
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.name}"

    class Meta:
        db_table = "person"
        verbose_name = "사람"
        verbose_name_plural = "사람"
        indexes = [
            models.Index(fields=["phone_number"]),
        ]
