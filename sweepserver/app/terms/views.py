from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import TermsAndConditions, TermsAndConditionsHistory
from .serializers import (
    TermsAndConditionsSerializer,
    TermsAndConditionsVersionSerializer,
)


class ReadTermsView(ModelViewSet):
    """
    약관 조회 API
        - url: GET /v1/terms/
    """

    queryset = TermsAndConditions.objects.filter(is_active=True)
    serializer_class = TermsAndConditionsSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get"]

    @extend_schema(summary="회원가입 약관 목록 조회", tags=["약관 조회"])
    def list(self, request, *args, **kwargs):
        """
        회원가입 약관 목록 조회
            - 추후, 필요할 시, 필드를 추가하여 따로 관리해야할 수 있음.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="회원가입 약관 상세 조회", tags=["약관 조회"])
    def retrieve(self, request, *args, **kwargs):
        """
        회원가입 약관 상세 조회
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)


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


class PrivacyPolicyView(GenericAPIView):
    """
    개인정보 처리 방침
        - url: GET /v1/privacy_policy/
    """

    permission_classes = [AllowAny]
    http_method_names = ["get"]

    @extend_schema(summary="개인정보 처리 방침", tags=["약관 조회"])
    def get(self, request):
        """
        약관 조회
        """
        version = request.query_params.get("version", None)

        if version:
            return get_terms_from_query_and_version(
                "Catch B 개인정보 처리 방침", version
            )

        return get_terms_from_query("Catch B 개인정보 처리 방침")


class TermsOfServiceView(GenericAPIView):
    """
    서비스 이용 약관
        - url: GET /v1/terms_of_service/
    """

    permission_classes = [AllowAny]
    http_method_names = ["get"]

    @extend_schema(summary="서비스 이용 약관", tags=["약관 조회"])
    def get(self, request):
        """
        약관 조회
        """
        version = request.query_params.get("version", None)

        if version:
            return get_terms_from_query_and_version("Catch B 서비스 이용약관", version)

        return get_terms_from_query("Catch B 서비스 이용약관")
