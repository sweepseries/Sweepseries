from rest_framework import serializers

from ..models import Announcement


class AnnouncementSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Announcement
        fields = ["id", "title", "content", "created_at", "updated_at"]
