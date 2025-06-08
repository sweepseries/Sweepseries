from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import AdminPageOnly
from ..models import InquiryThread, InquiryCategory, InquiryStatus
from ..serializers import (
    AdminInquiryThreadListSerializer,
    AdminInquiryThreadDetailSerializer,
    InquiryCategorySerializer,
    InquiryStatusSerializer,
)
from ..utils import (
    update_category,
    update_isread_admin,
    update_status,
    post_reply,
    post_notes,
)


class AdminInquiryViewSet(ModelViewSet):
    """
    관리자용 1:1 문의사항 API
        - url: /v1/admin/inquiries/
    """

    queryset = InquiryThread.objects.all()
    serializer_class = AdminInquiryThreadListSerializer
    permission_classes = [AdminPageOnly]
    http_method_names = ["get", "patch", "post"]

    @extend_schema(summary="관리자용 1:1 문의 목록 조회", tags=["관리자 1:1 문의"])
    def list(self, request, *args, **kwargs):
        """
        관리자용 1:1 문의 목록 조회
        TODO: 추후, pagination 기능 추가 예정
        """
        serializer = self.get_serializer(self.get_queryset(), many=True)

        categories = InquiryCategory.objects.all()
        category_serializer = InquiryCategorySerializer(categories, many=True)

        inquiry_status = InquiryStatus.objects.all()
        status_serializer = InquiryStatusSerializer(inquiry_status, many=True)

        return Response(
            data={
                "inquiries": serializer.data,
                "categories": category_serializer.data,
                "status": status_serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(summary="관리자용 1:1 문의 상세 조회", tags=["관리자 1:1 문의"])
    def retrieve(self, request, *args, **kwargs):
        """
        관리자용 1:1 문의 상세 조회
        """
        instance = self.get_object()
        serializer = AdminInquiryThreadDetailSerializer(instance)

        update_isread_admin(instance)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def create(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(exclude=True)
    def partial_update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(summary="1:1 문의 답변 등록", tags=["관리자 1:1 문의"])
    @action(detail=True, methods=["post"], url_path="reply")
    def reply(self, request, *args, **kwargs):
        """
        1:1 문의 답변 등록
        """
        instance = self.get_object()
        content = request.data.get("content")
        admin = request.user

        updated_inquiry = post_reply(instance, content, admin)

        serializer = AdminInquiryThreadDetailSerializer(updated_inquiry)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="1:1 문의 노트 등록", tags=["관리자 1:1 문의"])
    @action(detail=True, methods=["post"], url_path="notes")
    def notes(self, request, *args, **kwargs):
        """
        1:1 문의 노트 등록
        """
        instance = self.get_object()
        content = request.data.get("content")
        admin = request.user

        updated_inquiry = post_notes(instance, content, admin)

        serializer = AdminInquiryThreadDetailSerializer(updated_inquiry)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="1:1 문의 카테고리 변경", tags=["관리자 1:1 문의"])
    @action(detail=True, methods=["patch"], url_path="category")
    def category(self, request, *args, **kwargs):
        """
        1:1 문의 카테고리 변경
        """
        instance = self.get_object()
        category_id = request.data.get("category_id")
        admin = request.user

        updated_inquiry = update_category(instance, category_id, admin)

        serializer = AdminInquiryThreadDetailSerializer(updated_inquiry)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="1:1 문의 상태 변경", tags=["관리자 1:1 문의"])
    @action(detail=True, methods=["patch"], url_path="status")
    def status(self, request, *args, **kwargs):
        """
        1:1 문의 상태 변경
        """
        instance = self.get_object()
        status_id = request.data.get("status_id")
        admin = request.user

        updated_inquiry = update_status(instance, status_id, admin)

        serializer = AdminInquiryThreadDetailSerializer(updated_inquiry)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
