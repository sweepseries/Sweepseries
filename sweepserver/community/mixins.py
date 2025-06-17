from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework.exceptions import PermissionDenied

from community.profiles.models import CommunityProfile


class ProfileContextMixin:
    """
    JWT 인증 후 View 내부에서 호출되어, request.profile을 설정.
    실패 시, 아무런 예외도 발생하지 않음.
    """

    def attach_profile(self, request):
        request.profile = None

        profile_id = request.headers.get("X-Profile-ID")

        if not profile_id:
            if request.method == "GET":
                # GET 요청 시에는 프로필이 없어도 예외를 발생시키지 않음
                return
            raise PermissionDenied("프로필이 지정되지 않았습니다.")

        try:
            profile = CommunityProfile.objects.get(
                id=profile_id, user=request.user, is_blocked=False, is_deleted=False
            )
            request.profile = profile
        except (ObjectDoesNotExist, ValidationError) as e:
            if request.method == "GET":
                # GET 요청 시에는 프로필이 없어도 예외를 발생시키지 않음
                return
            raise PermissionDenied("프로필이 존재하지 않습니다.") from e
