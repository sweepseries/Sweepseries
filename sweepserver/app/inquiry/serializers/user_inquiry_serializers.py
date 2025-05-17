from django.db.transaction import atomic
from rest_framework import serializers

from ..enums import InquiryCategoryChoices, InquiryMessageTypeChoices
from ..models import InquiryThread, InquiryMessage


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
        representation["category"] = instance.get_category_display()
        representation["status"] = instance.get_status_display()
        return representation

    def get_is_updated(self, obj):
        """
        1:1 Admin의 가장 최근 메시지를 읽었는지 여부
        """
        if obj.messages.exists():
            last_message = obj.messages.last()
            return not last_message.is_read

        return False


class UserInquiryWriteSerializer(serializers.ModelSerializer):
    """
    1:1 문의 등록 시, 사용되는 Serializer
    """

    content = serializers.CharField(max_length=2000, required=True, write_only=True)
    name = serializers.CharField(max_length=255, required=False)
    email = serializers.EmailField(required=False)
    user = serializers.UUIDField(required=False)

    class Meta:
        model = InquiryThread
        fields = ["title", "category", "content", "name", "email", "user"]
        read_only_fields = ["id", "created_at", "is_updated"]

    def validate_category(self, value):
        """
        category가 존재하는 경우, InquiryCategoryChoices에 정의된 값인지 확인
        """
        if value not in [choice[0] for choice in InquiryCategoryChoices.choices]:
            raise serializers.ValidationError("잘못된 요청입니다.")

        return value

    def validate_user(self, value):
        """
        user가 존재하는 경우, 로그인 한 유저의 정보와 일치하는지 확인
        """
        if value:
            user = self.context["request"].user
            if user.is_authenticated and user.uuid != value:
                raise serializers.ValidationError("잘못된 요청입니다.")

            return user

        return None

    def validate(self, attrs):
        """
        user 혹은 name+email 둘 중 하나는 필수
        """
        if not attrs.get("user") and not (attrs.get("name") and attrs.get("email")):
            raise serializers.ValidationError("잘못된 요청입니다.")

        return super().validate(attrs)

    def create(self, validated_data):
        """
        1:1 문의 등록 시, 사용되는 Serializer
        """
        user = validated_data.pop("user", None)
        name = validated_data.pop("name", None)
        email = validated_data.pop("email", None)

        content = validated_data.pop("content")

        if user:
            validated_data["user"] = user
        else:
            validated_data["name"] = name
            validated_data["email"] = email

        with atomic():
            inquiry_thread = InquiryThread.objects.create(**validated_data)
            InquiryMessage.objects.create(
                thread=inquiry_thread,
                sender=InquiryMessageTypeChoices.USER,
                content=content,
            )

        return inquiry_thread
