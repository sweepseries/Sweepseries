from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError

from auth.user.models import User
from ..models import (
    InquiryThread,
    InquiryCategory,
    InquiryMessage,
    InquiryMessageTypeChoices,
)


def update_category(
    inquiry: InquiryThread, category_id: int, admin: User
) -> InquiryThread:
    """
    문의 카테고리 업데이트 함수.
    """
    try:
        category = InquiryCategory.objects.get(id=int(category_id))
    except (ObjectDoesNotExist, ValueError) as e:
        raise ValidationError("잘못된 요청입니다.") from e

    if category == inquiry.category:
        return inquiry

    inquiry.category = category
    inquiry.save()

    InquiryMessage.objects.create(
        thread=inquiry,
        sender=InquiryMessageTypeChoices.SYSTEM,
        user=admin,
        content=f"카테고리를 '{category.name}'(으)로 변경했습니다.",
    )

    return inquiry
