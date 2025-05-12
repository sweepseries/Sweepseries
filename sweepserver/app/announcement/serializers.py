from django.utils import timezone
from rest_framework import serializers

from .models import Announcement


class AnnouncementSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Announcement
        fields = ["id", "title", "content", "created_at", "updated_at"]


class AnnouncementSerializerForAdmin(AnnouncementSerializer):
    class Meta(AnnouncementSerializer.Meta):
        fields = AnnouncementSerializer.Meta.fields + ["is_deleted"]

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
