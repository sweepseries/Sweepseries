from rest_framework import serializers

from ..models import User


class UserProfileSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)
    mode = serializers.SerializerMethodField()
    name = serializers.CharField(source="person.name", read_only=True)

    class Meta:
        model = User
        fields = ["uuid", "mode", "name", "email", "profile_image"]
        read_only_fields = ["uuid", "mode", "name", "email", "profile_image"]

    def get_mode(self, obj):
        """
        유저 유형
            - 아카데미 운영자이거나, 코치이면 pro
            - 아니면 normal
        """
        ## TODO: Implement Pro
        ## 아래는 임시로 작성한 코드입니다.
        if obj.is_superuser:
            return "pro"

        return "normal"
