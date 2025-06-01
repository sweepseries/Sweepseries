from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import AdminPageOnly
from ..models import Announcement
from ..serializers import (
    AnnouncementSimpleSerializerForAdmin,
    AnnouncementDetailSerializerForAdmin,
)


class AnnouncementAdminViewSet(ModelViewSet):
    """
    공지사항 관리 API (관리자 전용)
        - url: /api/admin/v1/announcements/
    """

    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSimpleSerializerForAdmin
    permission_classes = [AdminPageOnly]
    http_method_names = ["get", "post", "delete"]

    @extend_schema(summary="공지사항 목록 조회", tags=["공지사항 관리"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="공지사항 상세 조회", tags=["공지사항 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AnnouncementDetailSerializerForAdmin(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="공지사항 생성", tags=["공지사항 관리"])
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="공지사항 삭제", tags=["공지사항 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="공지사항 재활성화", tags=["공지사항 관리"])
    @action(detail=True, methods=["post"], url_path="reactivate")
    def reactivate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = False
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
