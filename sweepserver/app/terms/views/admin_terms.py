from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import AdminPageOnly
from ..models import TermsAndConditions, TermsAndConditionsHistory
from ..serializers import (
    TermsAndConditionsSimpleSerializerForAdmin,
    TermsAndConditionsDetailSerializerForAdmin,
)
from ..utils import get_latest_version_id, soft_delete_term, reactivate_deleted_term


class AdminTermsViewSet(ModelViewSet):
    """
    약관 관리 API
        - url: /admin/v1/terms/
    """

    queryset = TermsAndConditions.objects.all()
    serializer_class = TermsAndConditionsSimpleSerializerForAdmin
    permission_classes = [AdminPageOnly]
    http_method_names = ["get", "post", "delete", "patch"]

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

    @extend_schema(exclude=True)
    def partial_update(self, request, *args, **kwargs):
        """
        회원가입 약관 부분 수정 (사용하지 않음)
            - 이 API는 사용하지 않습니다. 대신, `content` 액션을 사용합니다.
        """
        return Response(
            {
                "error": "이 API는 사용하지 않습니다. 대신, `content` 액션을 사용하세요."
            },
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    @extend_schema(summary="회원가입 약관 활성화", tags=["약관 관리"])
    @action(detail=True, methods=["post"], url_path="reactivate")
    def reactivate(self, request, *args, **kwargs):
        """
        회원가입 약관 활성화
        """
        instance = self.get_object()
        reactivate_deleted_term(instance)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="회원가입 약관 수정", tags=["약관 관리"])
    @action(detail=True, methods=["patch"], url_path="content")
    def content(self, request, *args, **kwargs):
        """
        회원가입 약관 수정 (약관 개정 API가 아니다.)
            - 약관의 내용만 변경할 수 있다.
        """
        version_id = request.data.get("version_id")
        instance = self.get_object()

        if int(version_id) != get_latest_version_id(instance):
            return Response(
                {"detail": "해당 약관의 최신 버전이 아닙니다."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        updated_content = request.data.get("content", "")

        instance.content = updated_content
        instance.save()
        history = TermsAndConditionsHistory.objects.get(pk=version_id)
        history.content = updated_content
        history.save()

        serializer = TermsAndConditionsDetailSerializerForAdmin(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)
