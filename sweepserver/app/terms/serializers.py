from rest_framework import serializers

from .models import TermsAndConditions, TermsAndConditionsHistory


class TermsAndConditionsSerializer(serializers.ModelSerializer):
    """
    약관 Serializer (유저용)
        - context로 버전이 명시될 경우,
            - 해당 버전이 있으면, 해당 약관 내용과 버전을 반환
            - 해당 버전이 없으면, raise NotFound
        - context로 버전이 없을 경우,
            - 최신 약관 내용을 반환
    """

    version = serializers.SerializerMethodField()

    class Meta:
        model = TermsAndConditions
        fields = ["id", "title", "content", "version", "is_required"]

    def get_version(self, obj) -> str:
        """
        버전: 업데이트 날짜
        """
        return obj.created_at.strftime("%Y-%m-%d")


class TermsAndConditionsVersionSerializer(serializers.ModelSerializer):
    """
    특정 버전의 약관 Serializer
    """

    title = serializers.CharField(source="terms.title")
    version = serializers.SerializerMethodField()
    is_required = serializers.BooleanField(source="terms.is_required")

    class Meta:
        model = TermsAndConditionsHistory
        fields = ["id", "title", "content", "version", "is_required"]

    def get_version(self, obj) -> str:
        """
        버전: 업데이트 날짜
        """
        return obj.created_at.strftime("%Y-%m-%d")
