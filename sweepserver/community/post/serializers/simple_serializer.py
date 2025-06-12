from rest_framework import serializers

from ..models import Post


class PostSimpleSerializer(serializers.ModelSerializer):
    """
    게시글 Serializer (리스트 조회용)
    """

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "content",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields
