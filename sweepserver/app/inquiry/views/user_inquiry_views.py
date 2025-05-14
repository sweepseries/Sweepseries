from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from ..models import InquiryThread
from ..serializers import UserInquirySerializer


class InquiryViewSet(ModelViewSet):
    """
    1:1 문의사항 API (누구나 접근 가능)
        - url: /v1/inquiries/
    """

    queryset = InquiryThread.objects.all()
    serializer_class = UserInquirySerializer
    permission_classes = [AllowAny]
    http_method_names = ["get"]

    @extend_schema(summary="1:1 문의 목록 조회", tags=["1:1 문의"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = UserInquirySerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
