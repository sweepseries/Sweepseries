from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseChipModel(models.Model):
    """
    Base model for chips with common fields.
    """

    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=7, default="#000000")

    class Meta:
        abstract = True
