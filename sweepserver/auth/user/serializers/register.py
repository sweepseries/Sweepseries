from datetime import datetime
import os
from urllib.parse import urlparse
import requests
from django.contrib.auth.password_validation import validate_password
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
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
    gender = serializers.CharField(allow_blank=True, allow_null=True)
    birth_year = serializers.CharField(allow_blank=True)
    birth_month = serializers.CharField(allow_blank=True)
    birth_day = serializers.CharField(allow_blank=True)
    nickname = serializers.CharField(allow_blank=True, allow_null=True)
    profile_image = serializers.CharField(allow_blank=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "name",
            "phone",
            "notifications",
            "gender",
            "birth_year",
            "birth_month",
            "birth_day",
            "nickname",
            "profile_image",
        ]

    def validate_email(self, value):
        # 이메일 형식 검사
        # convert to lowercase
        value = value.lower()
        EmailValidator()(value)

        return value

    def validate_gender(self, value):
        if not value:
            return GenderChoices.UNDEFINED
        if value == "남성":
            return GenderChoices.MALE
        if value == "여성":
            return GenderChoices.FEMALE
        if value == "기타":
            return GenderChoices.OTHER

        raise ValidationError("오류가 발생했습니다.")

    def validate_profile_image(self, value: str) -> ContentFile:
        if not value:
            return None

        ## otherwise, return the image
        ## If by any chance the URL is invalid, return None (simply leave profile_image null)

        ## First, validate URL structure
        parsed = urlparse(value)
        if parsed.scheme not in ("http", "https") or not parsed.netloc:
            return None

        try:
            res = requests.get(value, timeout=5)
            res.raise_for_status()
        except requests.RequestException:
            return None

        content_type = res.headers.get("Content-Type", "")
        if not content_type.startswith("image/"):
            return None

        ext = content_type.split("/", 1)[1].split(";", 1)[0]
        tmp_name = f"tmp.{ext}"

        file_content = ContentFile(res.content, name=tmp_name)

        return file_content

    def validate(self, attrs):
        birthdate = self.format_birth_date(
            attrs.pop("birth_year", None),
            attrs.pop("birth_month", None),
            attrs.pop("birth_day", None),
        )
        attrs["birth_date"] = birthdate

        return attrs

    def format_birth_date(
        self, birth_year: int, birth_month: int, birth_day: int
    ) -> datetime:
        """
        Format the birth date as needed
        """
        if not (birth_year and birth_month and birth_day):
            return None

        date = f"{birth_year}-{birth_month}-{birth_day}"

        try:
            birth_date = datetime.strptime(date, "%Y-%m-%d")
        except ValueError as e:
            raise ValidationError("생년월일 형식이 올바르지 않습니다.") from e

        return birth_date

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

    def upload_profile_image(self, user: User, image: ContentFile) -> User:
        """
        프로필 이미지 업로드
        """

        _, ext = os.path.splitext(image.name)
        today = datetime.today().strftime("%Y-%m-%d")

        filename = f"users/{user.uuid}/profiles/{today}{ext}"

        s3_client = default_storage.connection.meta.client
        bucket_name = default_storage.bucket_name

        s3_client.upload_fileobj(
            image,
            bucket_name,
            filename,
            ExtraArgs={
                "ACL": "public-read",
            },
        )

        return default_storage.url(filename)

    def set_notifications(self, user, notifications):
        if notifications:
            user.notification_agreed = True
            user.notification_agreed_at = datetime.now().astimezone()

        return user

    def create(self, validated_data):
        with atomic():
            person_data = {
                "name": validated_data.pop("name"),
                "phone": validated_data.pop("phone"),
                "birth_date": validated_data.pop("birth_date"),
                "gender": validated_data.pop("gender"),
            }
            person = self.create_person(**person_data)

            notifications = validated_data.pop("notifications", False)
            profile_image = validated_data.pop("profile_image", None)

            if not validated_data.get("nickname"):
                validated_data.pop("nickname")

            user = User.objects.create_user(
                person=person,
                **validated_data,
            )
            user = self.set_notifications(user, notifications)

            if profile_image:
                image = self.upload_profile_image(user, profile_image)
                user.profile_image = image

            user.save()

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

    def validate_username(self, value):
        UsernameValidator()(value)

        return value

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.pop("password2")

        if password != password2:
            raise ValidationError("비밀번호가 일치하지 않습니다.")

        # 비밀번호 유효성 검사
        # settings.AUTH_PASSWORD_VALIDATORS에 정의된 유효성 검사기를 사용
        # .validators에 있는 검사도 자동으로 포함된다
        validate_password(password)

        return super().validate(attrs)


class KakaoRegisterSerializer(BaseRegisterSerializer):
    """
    카카오 회원가입 Serializer
    """

    class Meta(BaseRegisterSerializer.Meta):
        fields = BaseRegisterSerializer.Meta.fields

    def validate(self, attrs):
        attrs["kakao_id"] = attrs.get("username")

        return super().validate(attrs)


class NaverRegisterSerializer(BaseRegisterSerializer):
    """
    네이버 회원가입 Serializer
    """

    class Meta(BaseRegisterSerializer.Meta):
        fields = BaseRegisterSerializer.Meta.fields

    def validate(self, attrs):
        attrs["naver_id"] = attrs.get("username")

        return super().validate(attrs)
