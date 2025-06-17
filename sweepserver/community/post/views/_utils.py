from django.utils import timezone
from rest_framework.request import Request

from ..models import Post, PostRead, PostLike


def create_post_read(request: Request, post: Post) -> PostRead | None:
    """
    게시글 읽음 기록을 생성합니다.
    사용자가 게시글을 읽었을 때 호출됩니다.
    """
    profile = request.profile

    if not profile:
        return None

    post_read, created = PostRead.objects.get_or_create(
        post=post,
        user_profile=profile,
    )

    if not created:
        time_now = timezone.now()

        post_read.last_read_at = time_now
        post_read.save(update_fields=["last_read_at"])

    return post_read


def like_or_unlike_post(request: Request, post: Post) -> bool:
    """
    게시글에 좋아요를 누르거나 취소합니다.
    사용자가 게시글에 좋아요를 누르거나 취소할 때 호출됩니다.
    """
    profile = request.profile

    post_like, created = PostLike.objects.get_or_create(
        post=post,
        user_profile=profile,
    )

    if not created:
        post_like.delete()
        return False

    return True
