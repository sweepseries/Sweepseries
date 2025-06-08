from rest_framework.exceptions import ValidationError

from auth.user.models import User
from ..models import InquiryThread, InquiryAdminNote


def post_notes(inquiry: InquiryThread, content: str, admin: User) -> InquiryThread:
    """
    1:1 문의에 노트를 등록합니다.

    :param inquiry: InquiryThread 인스턴스
    :param content: 노트 내용
    :param admin: 노트를 등록하는 관리자 인스턴스
    :return: 업데이트된 InquiryThread 인스턴스
    """
    if not content:
        raise ValidationError("노트 내용을 입력해주세요.")

    InquiryAdminNote.objects.create(
        thread=inquiry,
        admin=admin,
        content=content,
    )

    return inquiry
