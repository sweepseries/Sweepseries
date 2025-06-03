from rest_framework import serializers

from ..models import FAQ


class FAQReadSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = FAQ
        fields = ["id", "category", "question", "answer"]

    def get_category(self, obj):
        return obj.category.name
