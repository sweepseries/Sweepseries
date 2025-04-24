from rest_framework import serializers

from ..models import User


class UserProfileSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)
    mode = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["uuid", "mode"]

    def get_mode(self, obj):
        """
        유저 유형
            - 아카데미 운영자이거나, 코치이면 pro
            - 아니면 normal
        """
        ## TODO: Implement Pro
        print(obj) ## placeholder to pass lint
        return "normal"
