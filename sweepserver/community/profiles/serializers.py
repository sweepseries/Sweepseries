from rest_framework import serializers

from .models import CommunityProfile


class CommunityProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="profile_name", read_only=True)
    color = serializers.CharField(source="profile_color", read_only=True)

    class Meta:
        model = CommunityProfile
        fields = [
            "id",
            "name",
            "color",
            "profile_image",
        ]
        read_only_fields = ["id", "name", "color", "profile_image"]
