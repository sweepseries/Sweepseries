from rest_framework import serializers

from ..models import InquiryThread


class UserInquirySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    is_updated = serializers.SerializerMethodField()

    class Meta:
        model = InquiryThread
        fields = ["id", "title", "category", "status", "created_at", "is_updated"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["category"] = instance.get_category_display()
        representation["status"] = instance.get_status_display()
        return representation

    def get_is_updated(self, obj):
        """
        1:1 Admin의 가장 최근 메시지를 읽었는지 여부
        """
        if obj.messages.exists():
            last_message = obj.messages.last()
            return last_message.is_read

        return False
