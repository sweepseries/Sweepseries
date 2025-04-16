from rest_framework import serializers

from .models import User


class UserProfileSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)

    class Meta:
        model = User
        fields = ["uuid"]
