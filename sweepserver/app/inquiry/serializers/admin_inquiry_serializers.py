from rest_framework import serializers

from auth.user.serializers import UserProfileSerializer
from ..models import InquiryThread, InquiryMessageTypeChoices
from .message_serializers import InquiryMessageSerializer
from .note_serializers import InquiryAdminNoteSerializer
from .other_serializers import InquiryCategorySerializer, InquiryStatusSerializer


class AdminInquiryThreadListSerializer(serializers.ModelSerializer):
    """
    관리자용 1:1 문의 스레드 serializer (List 전용)
    """

    category = InquiryCategorySerializer(read_only=True)
    status = InquiryStatusSerializer(read_only=True)
    user = serializers.SerializerMethodField()
    is_read = serializers.SerializerMethodField()

    class Meta:
        model = InquiryThread
        fields = [
            "id",
            "title",
            "category",
            "user",
            "status",
            "created_at",
            "is_read",
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

    def get_is_read(self, obj):
        """
        User의 최신 메시지가 읽혔는지 여부 반환
        """
        if obj.messages.exists():
            return (
                obj.messages.filter(sender=InquiryMessageTypeChoices.USER)
                .last()
                .is_read
            )
        return False


class AdminInquiryThreadDetailSerializer(AdminInquiryThreadListSerializer):
    """
    관리자용 1:1 문의 스레드 serializer (Detail 전용)
    """

    messages = serializers.SerializerMethodField()
    notes = serializers.SerializerMethodField()

    class Meta(AdminInquiryThreadListSerializer.Meta):
        fields = AdminInquiryThreadListSerializer.Meta.fields + [
            "updated_at",
            "notes",
            "messages",
        ]

    def get_messages(self, obj):
        """
        스레드 내 메시지 목록 반환
        """
        return InquiryMessageSerializer(obj.messages.all(), many=True).data

    def get_notes(self, obj):
        """
        스레드 내 관리자 노트 목록 반환
        """
        return InquiryAdminNoteSerializer(obj.admin_notes.all(), many=True).data
