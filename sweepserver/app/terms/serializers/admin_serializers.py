from rest_framework import serializers

from ..models import TermsAndConditions, TermsAndConditionsHistory


class TermsAndConditionsListSerializerForAdmin(serializers.ModelSerializer):
    """
    약관 목록 조회용 Serializer (관리자용)
    """

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
        ]
