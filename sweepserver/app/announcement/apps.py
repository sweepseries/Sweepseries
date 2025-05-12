from django.apps import AppConfig


class AnnouncementConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "app.announcement"
    label = "announcement"
    verbose_name = "공지사항"
