from django.db import models


class FAQCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=7, default="#000000")

    objects = models.Manager()

    def __str__(self):
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

    def __str__(self):
        return f"{self.category.name} - {self.question}"

    class Meta:
        db_table = "faq"
        verbose_name = "자주 묻는 질문"
        verbose_name_plural = "자주 묻는 질문"
        ordering = ["id"]
