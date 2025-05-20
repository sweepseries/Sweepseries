from rest_framework import serializers

from ..models import FAQ


class FAQReadSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="get_category_display")

    class Meta:
        model = FAQ
        fields = ["id", "category", "question", "answer"]
