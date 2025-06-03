from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import AdminPageOnly
from ..models import FAQ, FAQCategory
from ..serializers import (
    FAQAdminSerializer,
    FAQAdminSimpleSerializer,
    FAQCategorySerializer,
)


class FAQAdminViewSet(ModelViewSet):
    """
    자주 묻는 질문 관리자 API
        - url: /api/v1/admin/faqs/
        - method: GET, POST, PUT, PATCH, DELETE
    """

    queryset = FAQ.objects.all()
    serializer_class = FAQAdminSimpleSerializer
    permission_classes = [AdminPageOnly]
    http_method_names = ["get", "delete", "post"]

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

    @extend_schema(summary="자주 묻는 질문 상세 조회", tags=["관리자 자주 묻는 질문"])
    def retrieve(self, request, *args, **kwargs):
        """
        자주 묻는 질문 상세 조회
        """
        instance = self.get_object()
        serializer = FAQAdminSerializer(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="자주 묻는 질문 생성", tags=["관리자 자주 묻는 질문"])
    def create(self, request, *args, **kwargs):
        """
        자주 묻는 질문 생성
        """
        serializer = FAQAdminSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="자주 묻는 질문 삭제", tags=["관리자 자주 묻는 질문"])
    def destroy(self, request, *args, **kwargs):
        """
        자주 묻는 질문 삭제
        """
        instance = self.get_object()
        instance.is_active = False
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="자주 묻는 질문 재활성화", tags=["관리자 자주 묻는 질문"])
    @action(detail=True, methods=["post"], url_path="reactivate")
    def reactivate(self, request, *args, **kwargs):
        """
        자주 묻는 질문 재활성화
        """
        instance = self.get_object()
        instance.is_active = True
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
