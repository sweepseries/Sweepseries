from ..models import TermsAndConditions, TermsAndConditionsHistory


def soft_delete_term(term: TermsAndConditions) -> None:
    """
    약관을 soft delete하는 함수
    """
    term.is_active = False
    term.order = 999
    term.save()

    TermsAndConditionsHistory.objects.create(
        terms=term,
        content=term.content,
        update_summary="약관 무효화",
        is_admin_only=True,
    )
