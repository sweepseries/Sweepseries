from django.utils import timezone
from rest_framework import serializers

from ..models import Announcement


class AnnouncementSimpleSerializerForAdmin(serializers.ModelSerializer):
    title = serializers.CharField(
        error_messages={
            "required": "제목을 입력해주세요.",
        }
    )

    class Meta:
        model = Announcement
        fields = [
            "id",
            "title",
            "created_at",
            "updated_at",
            "is_deleted",
            "is_important",
        ]


class AnnouncementDetailSerializerForAdmin(AnnouncementSimpleSerializerForAdmin):
    content = serializers.CharField(
        error_messages={
            "required": "내용을 입력해주세요.",
        }
    )

    class Meta(AnnouncementSimpleSerializerForAdmin.Meta):
        fields = AnnouncementSimpleSerializerForAdmin.Meta.fields + [
            "content",
        ]

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.updated_at = timezone.now()
        instance.save()

        return instance
