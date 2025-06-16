from django.utils import timezone
from rest_framework.request import Request

from community.profiles.models import CommunityProfile
from ..models import Post, PostRead


def create_post_read(request: Request, post: Post) -> PostRead | None:
    """
    게시글 읽음 기록을 생성합니다.
    사용자가 게시글을 읽었을 때 호출됩니다.
    """
    user = request.user
    profile = request.query_params.get("profile", None)

    if not profile:
        return None

    user_profile = CommunityProfile.objects.get(user=user, id=profile)

    post_read, created = PostRead.objects.get_or_create(
        post=post,
        user_profile=user_profile,
    )

    if not created:
        time_now = timezone.now()

        post_read.last_read_at = time_now
        post_read.save(update_fields=["last_read_at"])

    return post_read
