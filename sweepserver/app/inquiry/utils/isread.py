from ..models import InquiryThread, InquiryMessage, InquiryMessageTypeChoices


def update_isread_admin(inquiry: InquiryThread) -> None:
    if InquiryMessage.objects.filter(
        thread=inquiry, is_read=False, sender=InquiryMessageTypeChoices.USER
    ).exists():
        InquiryMessage.objects.filter(
            thread=inquiry, is_read=False, sender=InquiryMessageTypeChoices.USER
        ).update(is_read=True)
