from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from ..models import InquiryThread
from ..serializers import UserInquiryReadSerializer, UserInquiryWriteSerializer


class InquiryViewSet(ModelViewSet):
    """
    1:1 문의사항 API (누구나 접근 가능)
        - url: /v1/inquiries/
    """

    queryset = InquiryThread.objects.all()
    serializer_class = UserInquiryReadSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get", "post"]

    def get_serializer_class(self):
        if self.action in ["create"]:
            return UserInquiryWriteSerializer
        return super().get_serializer_class()

    @extend_schema(summary="1:1 문의 목록 조회", tags=["1:1 문의"])
    def list(self, request, *args, **kwargs):
        user = request.user

        if user.is_authenticated:
            queryset = self.get_queryset().filter(user=user)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        ## 로그인 되지 않은 유저의 경우 빈 queryset을 반환
        return Response([], status=status.HTTP_200_OK)

    @extend_schema(summary="1:1 문의 등록", tags=["1:1 문의"])
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.context["request"] = request
        serializer.is_valid(raise_exception=True)

        new_inquiry = serializer.save()

        read_serializer = UserInquiryReadSerializer(new_inquiry)

        return Response(read_serializer.data, status=status.HTTP_201_CREATED)
