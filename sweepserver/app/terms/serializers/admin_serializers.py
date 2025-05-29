from rest_framework import serializers

from ..models import TermsAndConditions, TermsAndConditionsHistory
from ..utils import (
    get_latest_version_id,
    get_max_order,
    has_content,
    has_content_version,
)


class TermsAndConditionsSimpleSerializerForAdmin(serializers.ModelSerializer):
    """
    약관 목록 조회용 Serializer (관리자용)
    """

    order = serializers.IntegerField(read_only=True)
    title = serializers.CharField(error_messages={"blank": "제목을 입력해주세요."})
    is_active = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    has_content = serializers.SerializerMethodField()
    content = serializers.CharField(write_only=True, allow_blank=True)

    class Meta:
        model = TermsAndConditions
        fields = [
            "id",
            "order",
            "title",
            "is_active",
            "is_required",
            "has_content",
            "created_at",
            "updated_at",
            "content",
        ]

    def get_has_content(self, obj):
        """
        약관이 내용이 있는지 여부를 반환합니다.
        """
        return has_content(obj)

    def create(self, validated_data):
        last_order = get_max_order()

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
        latest_version = get_latest_version_id(obj)
        if latest_version is None:
            raise serializers.ValidationError("오류가 발생했습니다.")

        return latest_version

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
                "is_admin_only": version.is_admin_only,
                "has_content": has_content_version(version),
            }

        return versions
