from django.apps import AppConfig


class PhoneVerificationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "auth.phoneverification"
    label = "phoneverification"
    verbose_name = "휴대폰 인증번호"
