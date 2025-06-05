from rest_framework import serializers

from auth.user.serializers import UserProfileSerializer
from ..models import InquiryThread, InquiryMessage
from .other_serializers import InquiryCategorySerializer, InquiryStatusSerializer


class AdminInquiryThreadListSerializer(serializers.ModelSerializer):
    """
    관리자용 1:1 문의 스레드 serializer (List 전용)
    """

    category = InquiryCategorySerializer(read_only=True)
    status = InquiryStatusSerializer(read_only=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = InquiryThread
        fields = [
            "id",
            "title",
            "category",
            "user",
            "status",
            "created_at",
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
