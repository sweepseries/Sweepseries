from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import AdminPageOnly
from ..models import Announcement
from ..serializers import AnnouncementSerializerForAdmin

class AnnouncementAdminViewSet(ModelViewSet):
    """
    공지사항 관리 API (관리자 전용)
        - url: /admin/announcements/
    """

    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializerForAdmin
    permission_classes = [AdminPageOnly]
    http_method_names = ["get", "post", "put", "delete"]

    @extend_schema(summary="공지사항 목록 조회", tags=["공지사항 관리"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
