from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from ..models import Announcement
from ..serializers import AnnouncementSerializer


class AnnouncementViewSet(ModelViewSet):
    """
    공지사항 조회 API (누구나 접근 가능)
        - url: /v1/announcements/
    """
    queryset = Announcement.objects.filter(is_deleted=False)
    serializer_class = AnnouncementSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get"]

    @extend_schema(summary="공지사항 목록 조회", tags=["공지사항 조회"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(is_deleted=False)
        serializer = AnnouncementSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="공지사항 상세 조회", tags=["공지사항 조회"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)
