from rest_framework import serializers

from ..models import PostImageAttachment


class PostImageAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImageAttachment
        fields = ["id", "image"]
        read_only_fields = ["id"]
