from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from ..models import FAQ, FAQCategory
from ..serializers import FAQAdminSimpleSerializer, FAQCategorySerializer


class FAQAdminViewSet(ModelViewSet):
    """
    자주 묻는 질문 관리자 API
        - url: /api/v1/admin/faqs/
        - method: GET, POST, PUT, PATCH, DELETE
    """

    queryset = FAQ.objects.all()
    serializer_class = FAQAdminSimpleSerializer
    permission_classes = [AllowAny]  # 관리자 권한이 필요할 경우 변경 필요
    http_method_names = ["get"]

    @extend_schema(summary="자주 묻는 질문 목록 조회", tags=["관리자 자주 묻는 질문"])
    def list(self, request, *args, **kwargs):
        """
        자주 묻는 질문 목록 조회
        """
        faqs_by_category = {}
        queryset = self.get_queryset()

        for category in FAQCategory.objects.all():
            faqs = queryset.filter(category=category)
            data = FAQAdminSimpleSerializer(faqs, many=True).data
            faqs_by_category[category.name] = data

        all_faqs = FAQAdminSimpleSerializer(queryset, many=True).data
        faqs_by_category["전체"] = all_faqs

        categories = FAQCategory.objects.all()
        ## add 전체 to categories
        categories = [FAQCategory(id=-1, name="전체", color="#1E90FF")] + list(
            categories
        )
        categories_serialzier = FAQCategorySerializer(categories, many=True).data

        return Response(
            {"categories": categories_serialzier, "faqs": faqs_by_category},
            status=status.HTTP_200_OK,
        )
