from django.apps import AppConfig


class ReportConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "community.report"
    label = "report"
    verbose_name = "신고 관리"
