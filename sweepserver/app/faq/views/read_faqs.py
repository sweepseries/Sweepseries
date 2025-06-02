from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ReadOnlyModelViewSet

from ..models import FAQ, FAQCategory
from ..serializers import FAQReadSerializer


class FAQViewSet(ReadOnlyModelViewSet):
    """
    자주 묻는 질문 조회 API (누구나 접근 가능)
        - url: /v1/faqs/
        - method: GET only
    """

    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQReadSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get"]

    @extend_schema(summary="자주 묻는 질문 목록 조회", tags=["자주 묻는 질문"])
    def list(self, request, *args, **kwargs):
        """
        자주 묻는 질문 목록 조회
        """
        categories = ["전체"]
        faqs_by_category = {}
        queryset = self.get_queryset()

        for category in FAQCategory.objects.all():
            faqs = queryset.filter(category=category)
            data = FAQReadSerializer(faqs, many=True).data
            categories.append(category.name)
            faqs_by_category[category.name] = data

        all_faqs = FAQReadSerializer(queryset, many=True).data
        faqs_by_category["전체"] = all_faqs

        return Response(
            {"categories": categories, "faqs": faqs_by_category},
            status=status.HTTP_200_OK,
        )
