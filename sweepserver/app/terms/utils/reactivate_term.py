from .get_order import get_max_order
from ..models import TermsAndConditions, TermsAndConditionsHistory


def reactivate_deleted_term(term: TermsAndConditions) -> None:
    """
    soft delete된 약관을 재활성화하는 함수
    """
    term.is_active = True
    last_order = get_max_order()
    term.order = last_order + 1
    term.save()

    TermsAndConditionsHistory.objects.create(
        terms=term,
        content=term.content,
        update_summary="약관 재활성화",
        is_admin_only=True,
    )
