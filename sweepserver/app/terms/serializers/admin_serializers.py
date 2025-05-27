from django.db import models
from rest_framework import serializers

from ..models import TermsAndConditions, TermsAndConditionsHistory


class TermsAndConditionsSimpleSerializerForAdmin(serializers.ModelSerializer):
    """
    약관 목록 조회용 Serializer (관리자용)
    """

    order = serializers.IntegerField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    content = serializers.CharField(write_only=True, allow_blank=True)

    class Meta:
        model = TermsAndConditions
        fields = [
            "id",
            "order",
            "title",
            "is_active",
            "is_required",
            "created_at",
            "updated_at",
            "content",
        ]

    def create(self, validated_data):
        last_order = (
            TermsAndConditions.objects.aggregate(max_order=models.Max("order"))[
                "max_order"
            ]
            or 0
        )

        term = TermsAndConditions.objects.create(
            order=last_order + 1,
            is_active=True,
            **validated_data,
        )
        TermsAndConditionsHistory.objects.create(
            terms=term,
            content=validated_data.get("content", ""),
            update_summary="약관 생성",
        )

        return term
