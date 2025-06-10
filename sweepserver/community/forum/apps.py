from django.apps import AppConfig


class ForumConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "community.forum"
    label = "forum"
    verbose_name = "커뮤니티 게시판"
