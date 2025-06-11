from auth.user.models import User
from .models import CommunityProfile


def create_community_profile_register(user: User) -> None:
    CommunityProfile.objects.create(
        user=user,
        profile_name=user.nickname,
        profile_color=user.default_color,
        profile_image=user.profile_image or None,
        is_default=True,
    )
