from django.apps import AppConfig


class PostConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "community.post"
    label = "post"
    verbose_name = "커뮤니티 게시글"
