from rest_framework import serializers

from ..models import InquiryCategory, InquiryStatus


class InquiryCategorySerializer(serializers.ModelSerializer):
    """
    1:1 문의 카테고리 Serializer
    """

    class Meta:
        model = InquiryCategory
        fields = ["id", "name", "color"]


class InquiryStatusSerializer(serializers.ModelSerializer):
    """
    1:1 문의 상태 Serializer
    """

    class Meta:
        model = InquiryStatus
        fields = ["id", "name", "color"]
