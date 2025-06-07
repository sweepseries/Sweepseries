from rest_framework.exceptions import ValidationError

from auth.user.models import User
from ..models import InquiryThread, InquiryMessage, InquiryMessageTypeChoices


def post_reply(inquiry: InquiryThread, content: str, admin: User) -> InquiryThread:
    """
    1:1 문의에 답변을 등록합니다.

    :param inquiry: InquiryThread 인스턴스
    :param content: 답변 내용
    :param admin: 답변을 등록하는 관리자 인스턴스
    :return: 업데이트된 InquiryThread 인스턴스
    """
    if not content:
        raise ValidationError("답변 내용을 입력해주세요.")

    InquiryMessage.objects.create(
        thread=inquiry,
        sender=InquiryMessageTypeChoices.ADMIN,
        user=admin,
        content=content,
    )

    return inquiry
