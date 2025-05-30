from django.utils import timezone
from rest_framework import serializers

from ..models import Announcement


class AnnouncementSerializerForAdmin(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = [
            "id",
            "title",
            "content",
            "created_at",
            "updated_at",
            "is_deleted",
            "is_important",
        ]

    def validate(self, attrs):
        if not attrs.get("content"):
            raise serializers.ValidationError("Content is required.")
        if not attrs.get("title"):
            raise serializers.ValidationError("Title is required.")
        return attrs

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.updated_at = timezone.now()
        instance.save()

        return instance
