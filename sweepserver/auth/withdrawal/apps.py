from django.apps import AppConfig


class WithdrawalConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "auth.withdrawal"
    label = "withdrawal"
    verbose_name = "회원 탈퇴"
