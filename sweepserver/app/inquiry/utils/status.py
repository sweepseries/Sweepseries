from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError

from auth.user.models import User
from ..models import (
    InquiryThread,
    InquiryStatus,
    InquiryMessage,
    InquiryMessageTypeChoices,
)


def update_status(inquiry: InquiryThread, status_id: int, admin: User) -> InquiryThread:
    """
    문의 카테고리 업데이트 함수.
    """
    try:
        status = InquiryStatus.objects.get(id=int(status_id))
    except (ObjectDoesNotExist, ValueError) as e:
        raise ValidationError("잘못된 요청입니다.") from e

    if status == inquiry.status:
        return inquiry

    inquiry.status = status
    inquiry.save()

    InquiryMessage.objects.create(
        thread=inquiry,
        sender=InquiryMessageTypeChoices.SYSTEM,
        user=admin,
        content=f"상태를 '{status.name}'(으)로 변경했습니다.",
    )

    return inquiry
