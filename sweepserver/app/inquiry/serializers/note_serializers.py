from rest_framework import serializers

from auth.user.serializers import UserProfileSerializer
from ..models import InquiryAdminNote


class InquiryAdminNoteSerializer(serializers.ModelSerializer):
    """
    1:1 문의 관리자 노트 Serializer
    """

    admin = UserProfileSerializer(read_only=True)

    class Meta:
        model = InquiryAdminNote
        fields = ["id", "admin", "content", "created_at", "updated_at"]
