from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import AdminPageOnly
from ..models import TermsAndConditions
from ..serializers import TermsAndConditionsListSerializerForAdmin


class AdminTermsViewSet(ModelViewSet):
    """
    약관 관리 API
        - url: /admin/v1/terms/
    """

    queryset = TermsAndConditions.objects.all()
    serializer_class = TermsAndConditionsListSerializerForAdmin
    permission_classes = [AdminPageOnly]
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
