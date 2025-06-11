from rest_framework import serializers

from community.forum.models import Forum, Tag
from community.forum.serializers import ForumSerializer, TagSerializer
from community.profiles.models import CommunityProfile
from community.profiles.serializers import CommunityProfileSerializer
from ..models import Post, PostImageAttachment
from .image_serializer import PostImageAttachmentSerializer


class PostDetailSerializer(serializers.ModelSerializer):
    """
    게시글 Serializer (상세 조회, 생성, 수정용)
    """

    ### Read-only 필드: 상세 조회용
    forum = ForumSerializer(read_only=True)
    author = CommunityProfileSerializer(read_only=True)
    tag = TagSerializer(read_only=True)

    ### Write-only pk 필드: 생성/수정용
    forum_id = serializers.PrimaryKeyRelatedField(
        source="forum",
        queryset=Forum.objects.all(),
        write_only=True,
    )
    author_id = serializers.PrimaryKeyRelatedField(
        source="author",
        queryset=CommunityProfile.objects.all(),
        write_only=True,
    )
    tag_id = serializers.PrimaryKeyRelatedField(
        source="tag",
        queryset=Tag.objects.all(),
        write_only=True,
    )

    ### 이미지 업로드용 write-only 필드
    image_files = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False,
    )
    ### 이미지 조회용 read-only 필드
    images = PostImageAttachmentSerializer(many=True, read_only=True)

    class Meta:
        models = Post
        fields = [
            "id",
            "forum",
            "forum_id",
            "author",
            "author_id",
            "tag",
            "tag_id",
            "title",
            "content",
            "images",
            "image_files",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "images", "created_at", "updated_at"]

    def create(self, validated_data):
        """
        게시글 생성 시 이미지 파일 처리
        """
        image_files = validated_data.pop("image_files", [])
        post = Post.objects.create(**validated_data)

        for image_file in image_files:
            PostImageAttachment.objects.create(post=post, image=image_file)

        return post
