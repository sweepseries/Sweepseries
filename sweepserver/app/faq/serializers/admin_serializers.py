from rest_framework import serializers

from ..models import FAQ, FAQCategory


class FAQCategorySerializer(serializers.ModelSerializer):
    """
    FAQ 카테고리 serializer
    """

    class Meta:
        model = FAQCategory
        fields = ["id", "name", "color"]


class FAQAdminSimpleSerializer(serializers.ModelSerializer):
    """
    FAQ 관리자용 serializer (List 전용)
    """

    category = FAQCategorySerializer(read_only=True)

    class Meta:
        model = FAQ
        fields = ["id", "category", "question", "is_active"]


class FAQAdminSerializer(FAQAdminSimpleSerializer):
    """
    FAQ 관리자용 serializer (상세 조회, 생성, 수정용)
    """

    class Meta(FAQAdminSimpleSerializer.Meta):
        fields = FAQAdminSimpleSerializer.Meta.fields + ["answer"]
