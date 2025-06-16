from rest_framework import serializers

from core.storage import get_presigned_url
from ..models import PostImageAttachment


class PostImageAttachmentSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PostImageAttachment
        fields = ["id", "image"]
        read_only_fields = ["id"]

    def get_image(self, obj):
        """
        이미지 필드에 presigned URL을 반환합니다.
        """
        return get_presigned_url(obj.image)
