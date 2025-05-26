from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response

from ..models import TermsAndConditions, TermsAndConditionsHistory
from ..serializers import (
    TermsAndConditionsSerializer,
    TermsAndConditionsVersionSerializer,
)


def get_terms_from_query(query: str) -> Response:
    """
    특정 약관을 조회하는 함수 (제목이 일치해야 함)
    """
    try:
        terms = TermsAndConditions.objects.get(title=query, is_active=True)
    except ObjectDoesNotExist as e:
        raise ObjectDoesNotExist("존재하지 않는 약관입니다.") from e

    serializer = TermsAndConditionsSerializer(terms)

    return Response(serializer.data, status=status.HTTP_200_OK)


def get_terms_from_query_and_version(query: str, version: str) -> Response:
    """
    특정 약관의 특정 버전을 조회하는 함수
    """
    try:
        ## version은 YYYY-MM-DD 형식으로 들어와야 한다.
        ## 먼저 형식을 확인한다.
        date = datetime.strptime(version, "%Y-%m-%d").date()
    except ValueError:
        return Response(
            {"error": "version은 YYYY-MM-DD 형식으로 입력해야 합니다."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        terms = TermsAndConditions.objects.get(title=query, is_active=True)
        terms_history = TermsAndConditionsHistory.objects.get(
            terms=terms, created_at__date=date
        )
    except ObjectDoesNotExist as e:
        raise ObjectDoesNotExist("존재하지 않는 약관입니다.") from e

    serializer = TermsAndConditionsVersionSerializer(terms_history)

    return Response(serializer.data, status=status.HTTP_200_OK)
