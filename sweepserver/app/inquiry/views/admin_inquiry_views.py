from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import AdminPageOnly
from ..models import InquiryThread, InquiryCategory, InquiryStatus
from ..serializers import (
    AdminInquiryThreadListSerializer,
    InquiryCategorySerializer,
    InquiryStatusSerializer,
)


class AdminInquiryViewSet(ModelViewSet):
    """
    관리자용 1:1 문의사항 API
        - url: /v1/admin/inquiries/
    """

    queryset = InquiryThread.objects.all()
    serializer_class = AdminInquiryThreadListSerializer
    permission_classes = [AdminPageOnly]
    http_method_names = ["get"]

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
