from django.db.transaction import atomic
from rest_framework import serializers

from ..models import InquiryThread, InquiryMessage, InquiryCategory


class UserInquiryReadSerializer(serializers.ModelSerializer):
    """
    1:1 문의 조회 시, 사용되는 Serializer
    """

    created_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    is_updated = serializers.SerializerMethodField()

    class Meta:
        model = InquiryThread
        fields = ["id", "title", "category", "status", "created_at", "is_updated"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["category"] = instance.category.name
        representation["status"] = instance.status.name
        return representation

    def get_is_updated(self, obj):
        """
        1:1 가장 최근 메시지를 읽었는지 여부
        """
        last_message = obj.messages.last()
        return not last_message.is_read


class UserInquiryWriteSerializer(serializers.ModelSerializer):
    """
    1:1 문의 등록 시, 사용되는 Serializer
    """

    title = serializers.CharField(
        max_length=255, required=True, error_messages={"blank": "제목을 입력해주세요."}
    )
    content = serializers.CharField(
        max_length=2000,
        required=True,
        write_only=True,
        error_messages={"blank": "내용을 입력해주세요."},
    )
    category = serializers.PrimaryKeyRelatedField(
        queryset=InquiryCategory.objects.all(),
        write_only=True,
        error_messages={
            "required": "카테고리를 선택해주세요.",
            "does_not_exist": "카테고리를 선택해주세요.",
        },
    )
    name = serializers.CharField(max_length=255, required=False)
    email = serializers.EmailField(required=False)
    user = serializers.UUIDField(required=False)

    class Meta:
        model = InquiryThread
        fields = ["title", "category", "content", "name", "email", "user"]
        read_only_fields = ["id", "created_at", "is_updated"]

    def validate_user(self, value):
        """
        user가 존재하는 경우, 로그인 한 유저의 정보와 일치하는지 확인
        """
        user = self.context["request"].user
        if user.is_authenticated and user.uuid != value:
            raise serializers.ValidationError("잘못된 요청입니다.")

        return user

    def validate(self, attrs):
        """
        user 혹은 name+email 둘 중 하나는 필수
        """
        if not attrs.get("user") and not attrs.get("name") and not attrs.get("email"):
            raise serializers.ValidationError("이름과 이메일을 입력해주세요.")

        return super().validate(attrs)

    def create(self, validated_data):
        """
        1:1 문의 등록 시, 사용되는 Serializer
        """
        user = validated_data.pop("user", None)
        if user:
            validated_data["user"] = user
            validated_data["name"] = user.person.name
            validated_data["email"] = user.email

        content = validated_data.pop("content")

        with atomic():
            inquiry_thread = InquiryThread.objects.create(**validated_data)
            InquiryMessage.objects.create(
                thread=inquiry_thread,
                content=content,
            )

        return inquiry_thread
