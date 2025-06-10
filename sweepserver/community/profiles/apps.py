from django.apps import AppConfig


class CommunityProfileConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "community.profiles"
    label = "community_profile"
    verbose_name = "커뮤니티 프로필"
