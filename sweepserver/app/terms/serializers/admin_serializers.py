from django.db import models
from rest_framework import serializers

from ..models import TermsAndConditions, TermsAndConditionsHistory


class TermsAndConditionsSimpleSerializerForAdmin(serializers.ModelSerializer):
    """
    약관 목록 조회용 Serializer (관리자용)
    """

    order = serializers.IntegerField(read_only=True)
    title = serializers.CharField(error_messages={"blank": "제목을 입력해주세요."})
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


class TermsAndConditionsDetailSerializerForAdmin(serializers.ModelSerializer):
    """
    약관 상세 조회용 Serializer (관리자용)
    """

    latest_version_id = serializers.SerializerMethodField()
    versions = serializers.SerializerMethodField()

    class Meta:
        model = TermsAndConditions
        fields = [
            "id",
            "order",
            "title",
            "is_active",
            "is_required",
            "latest_version_id",
            "versions",
        ]

    def get_latest_version_id(self, obj):
        """
        가장 최근 버전의 ID를 반환합니다.
        """
        latest_version = obj.history.order_by("-created_at").first()
        if not latest_version:
            raise serializers.ValidationError("오류가 발생했습니다.")

        return latest_version.id

    def get_versions(self, obj):
        """
        약관의 모든 버전을 반환합니다.
        """
        versions = {}

        histories = obj.history.all()

        for version in histories:
            versions[version.id] = {
                "id": version.id,
                "content": version.content,
                "created_at": version.created_at.strftime("%Y-%m-%d"),
                "update_summary": version.update_summary,
            }

        return versions
