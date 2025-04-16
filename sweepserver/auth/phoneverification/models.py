from django.db import models


class PhoneVerification(models.Model):
    phone_number = models.CharField(max_length=20)
    verification_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()

    class Meta:
        db_table = "phone_verification"
        verbose_name = "휴대폰 인증번호"
        verbose_name_plural = "휴대폰 인증번호"
