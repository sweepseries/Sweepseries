from datetime import datetime
from django.contrib.auth.password_validation import validate_password
from django.db.transaction import atomic
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from auth.person.models import Person, GenderChoices
from ..models import User
from ..validators import UsernameValidator, EmailValidator


class BaseRegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    notifications = serializers.BooleanField(required=True)

    class Meta:
        model = User
        fields = ["username", "email", "name", "phone", "notifications"]

    def validate_username(self, value):
        UsernameValidator()(value)

        return value

    def validate_email(self, value):
        # 이메일 형식 검사
        # convert to lowercase
        value = value.lower()
        EmailValidator()(value)

        return value

    def create_person(self, **kwargs):
        """
        Person 모델 생성
        """
        person = Person.objects.create(
            name=kwargs.pop("name"),
            phone_number=kwargs.pop("phone"),
            birth_date=kwargs.get("birth_date", None),
            gender=kwargs.get("gender", GenderChoices.UNDEFINED),
        )

        return person

    def set_notifications(self, user, notifications):
        if notifications:
            user.notification_agreed = True
            user.notification_agreed_at = datetime.now().astimezone()

        return user


class CatchBRegisterSerializer(BaseRegisterSerializer):
    """
    CatchB 회원가입 Serializer
    """

    password = serializers.CharField(
        write_only=True,
        error_messages={
            "required": "비밀번호를 입력해주세요.",
            "blank": "비밀번호를 입력해주세요.",
        },
    )
    password2 = serializers.CharField(
        write_only=True,
        error_messages={
            "required": "비밀번호를 입력해주세요.",
            "blank": "비밀번호를 입력해주세요.",
        },
    )

    class Meta(BaseRegisterSerializer.Meta):
        fields = BaseRegisterSerializer.Meta.fields + ["password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.pop("password2")

        if password != password2:
            raise ValidationError("비밀번호가 일치하지 않습니다.")

        # 비밀번호 유효성 검사
        # settings.AUTH_PASSWORD_VALIDATORS에 정의된 유효성 검사기를 사용
        # .validators에 있는 검사도 자동으로 포함된다
        validate_password(password)

        return attrs

    def create(self, validated_data):
        with atomic():
            person = self.create_person(**validated_data)
            user = User.objects.create_user(
                username=validated_data["username"],
                email=validated_data["email"],
                password=validated_data["password"],
                person=person,
            )

            user = self.set_notifications(
                user, validated_data.get("notifications", False)
            )
            user.save()

        return user
