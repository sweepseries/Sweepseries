from rest_framework import serializers

from community.forum.models import Forum, Tag
from community.forum.serializers import ForumSimpleSerializer, TagSerializer
from community.profiles.models import CommunityProfile
from community.profiles.serializers import CommunityProfileSerializer
from ..models import Post, PostImageAttachment
from .image_serializer import PostImageAttachmentSerializer


BAD_REQUEST_ERROR_TEXT = "잘못된 요청입니다."


class PostDetailSerializer(serializers.ModelSerializer):
    """
    게시글 Serializer (상세 조회, 생성, 수정용)
    """

    ### Read-only 필드: 상세 조회용
    forum = ForumSimpleSerializer(read_only=True)
    author = CommunityProfileSerializer(read_only=True)
    tag = TagSerializer(read_only=True)
    title = serializers.CharField(
        max_length=40,
        error_messages={
            "max_length": "제목은 최대 40자까지 입력할 수 있습니다.",
            "required": "제목을 입력해주세요.",
            "blank": "제목을 입력해주세요.",
        },
    )
    content = serializers.CharField(
        error_messages={
            "blank": "내용을 입력해주세요.",
            "required": "내용을 입력해주세요.",
        },
    )

    ### Write-only pk 필드: 생성/수정용
    forum_id = serializers.PrimaryKeyRelatedField(
        source="forum",
        queryset=Forum.objects.all(),
        write_only=True,
        error_messages={
            "does_not_exist": "존재하지 않는 게시판입니다.",
            "required": "게시판을 선택해주세요.",
        },
    )
    author_id = serializers.PrimaryKeyRelatedField(
        source="author",
        queryset=CommunityProfile.objects.all(),
        write_only=True,
        error_messages={
            "does_not_exist": BAD_REQUEST_ERROR_TEXT,
            "required": BAD_REQUEST_ERROR_TEXT,
        },
    )
    tag_id = serializers.PrimaryKeyRelatedField(
        source="tag",
        queryset=Tag.objects.all(),
        write_only=True,
        error_messages={
            "does_not_exist": "존재하지 않는 태그입니다.",
            "required": "태그를 선택해주세요.",
        },
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
        model = Post
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

    def validate(self, attrs):
        """
        유효성 검사
        - 작성자 유효성 검사: 현재 로그인한 사용자의 프로필과 일치하는지 확인
        """
        user = self.context["request"].user
        author = attrs.get("author")

        if author.user != user:
            raise serializers.ValidationError(BAD_REQUEST_ERROR_TEXT)

        return attrs

    def create(self, validated_data):
        """
        게시글 생성 시 이미지 파일 처리
        """
        image_files = validated_data.pop("image_files", [])
        post = Post.objects.create(**validated_data)

        for image_file in image_files:
            PostImageAttachment.objects.create(post=post, image=image_file)

        return post
