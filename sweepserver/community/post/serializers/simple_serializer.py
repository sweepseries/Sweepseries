from rest_framework import serializers

from community.forum.serializers import TagSerializer
from community.profiles.serializers import CommunityProfileSerializer
from core.storage import get_presigned_url
from ..models import Post


class PostSimpleSerializer(serializers.ModelSerializer):
    """
    게시글 Serializer (리스트 조회용)
    """

    author = CommunityProfileSerializer(read_only=True)
    tag = TagSerializer(read_only=True)
    num_views = serializers.IntegerField(read_only=True)
    num_likes = serializers.SerializerMethodField()
    num_comments = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    is_updated = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "tag",
            "title",
            "content",
            "image",
            "num_views",
            "num_likes",
            "num_comments",
            "created_at",
            "is_updated",
        ]
        read_only_fields = fields

    def get_image(self, obj):
        if obj.images.exists():
            return get_presigned_url(obj.images.first().image)

        return None

    def get_num_likes(self, obj):
        print(obj)
        return 0

    def get_num_comments(self, obj):
        print(obj.title)
        return 0

    def get_is_updated(self, obj):
        """
        게시글이 수정되었는지 여부를 반환합니다.
        """
        return obj.updated_at > obj.created_at
