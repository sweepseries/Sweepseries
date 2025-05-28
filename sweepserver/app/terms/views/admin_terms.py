from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import AdminPageOnly
from ..models import TermsAndConditions
from ..serializers import (
    TermsAndConditionsSimpleSerializerForAdmin,
    TermsAndConditionsDetailSerializerForAdmin,
)
from ..utils import soft_delete_term, reactivate_deleted_term


class AdminTermsViewSet(ModelViewSet):
    """
    약관 관리 API
        - url: /admin/v1/terms/
    """

    queryset = TermsAndConditions.objects.all()
    serializer_class = TermsAndConditionsSimpleSerializerForAdmin
    permission_classes = [AdminPageOnly]
    http_method_names = ["get", "post", "delete"]

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
        serializer = TermsAndConditionsDetailSerializerForAdmin(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="회원가입 약관 생성", tags=["약관 관리"])
    def create(self, request, *args, **kwargs):
        """
        회원가입 약관 생성
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="회원가입 약관 무효화", tags=["약관 관리"])
    def destroy(self, request, *args, **kwargs):
        """
        회원가입 약관 무효화 (soft delete)
        """
        instance = self.get_object()
        soft_delete_term(instance)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="회원가입 약관 활성화", tags=["약관 관리"])
    @action(detail=True, methods=["post"], url_path="reactivate")
    def reactivate(self, request, *args, **kwargs):
        """
        회원가입 약관 활성화
        """
        instance = self.get_object()
        reactivate_deleted_term(instance)

        return Response(status=status.HTTP_204_NO_CONTENT)
