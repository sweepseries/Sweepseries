from rest_framework import serializers

from auth.user.serializers import UserProfileSerializer
from ..models import InquiryMessage


class InquiryMessageSerializer(serializers.ModelSerializer):
    """
    1:1 문의 메시지 Serializer
    """

    sender = serializers.CharField(source="get_sender_display", read_only=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = InquiryMessage
        fields = [
            "id",
            "sender",
            "user",
            "content",
            "is_read",
            "created_at",
            "updated_at",
        ]

    def get_user(self, obj):
        """
        사용자 정보 반환
        """
        if obj.user:
            return UserProfileSerializer(obj.user).data

        return {
            "name": obj.name,
            "email": obj.email,
        }
