from django.db import models

from ..models import TermsAndConditions


def get_max_order() -> int:
    """
    현재 활성화된 약관 중 최대 order 값을 반환합니다.
    만약 활성화된 약관이 없다면 0을 반환합니다.
    """
    max_order = TermsAndConditions.objects.filter(is_active=True).aggregate(
        max_order=models.Max("order")
    )["max_order"]

    return max_order if max_order is not None else 0
