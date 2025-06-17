from uuid import UUID
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.utils import timezone
from rest_framework.exceptions import APIException
from rest_framework.request import Request

from auth.user.models import User
from community.profiles.models import CommunityProfile
from ..models import Post, PostRead, PostLike


def _get_profile(user: User, profile_id: UUID) -> CommunityProfile:
    """
    요청에서 프로필을 가져옵니다.
    프로필이 없거나 유효하지 않은 경우 예외를 발생시킵니다.
    """
    try:
        user_profile = CommunityProfile.objects.get(user=user, id=profile_id)
    except (ObjectDoesNotExist, ValidationError):
        raise APIException("프로필이 존재하지 않습니다.")

    return user_profile


def create_post_read(request: Request, post: Post) -> PostRead | None:
    """
    게시글 읽음 기록을 생성합니다.
    사용자가 게시글을 읽었을 때 호출됩니다.
    """
    user = request.user
    profile = request.query_params.get("profile", None)

    if not profile:
        return None

    user_profile = _get_profile(user, profile)

    post_read, created = PostRead.objects.get_or_create(
        post=post,
        user_profile=user_profile,
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
    profile = request.data.get("profile", None)

    if not profile:
        raise APIException("프로필이 지정되지 않았습니다.")

    user_profile = _get_profile(request.user, profile)

    post_like, created = PostLike.objects.get_or_create(
        post=post,
        user_profile=user_profile,
    )

    if not created:
        post_like.delete()
        return False

    return True
