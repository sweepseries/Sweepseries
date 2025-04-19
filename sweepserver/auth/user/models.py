from random import choice, randrange
import uuid
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.db import models

from auth.person.models import Person


def random_color_generator():
    return f"#{randrange(256):02X}{randrange(256):02X}{randrange(256):02X}"


def random_nickname_generator():
    with open("data/nickname/adjectives.txt", "r", encoding="utf-8") as adj_file:
        adjectives = adj_file.read().split(",")

    with open("data/nickname/characters.txt", "r", encoding="utf-8") as char_file:
        characters = char_file.read().split(",")

    adjectives = [adj.strip() for adj in adjectives]
    characters = [char.strip() for char in characters]

    random_adj = choice(adjectives)
    random_char = choice(characters)

    return f"{random_adj} {random_char}"


class UserManager(BaseUserManager):
    def create_user(self, password=None, **extra_fields):
        user = self.model(**extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, password=None, **extra_fields):
        person = Person.objects.create(name="Admin", phone_number="010-1234-1234")
        extra_fields["person"] = person
        user = self.create_user(password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    person = models.OneToOneField(Person, on_delete=models.CASCADE, related_name="user")

    nickname = models.CharField(max_length=150, default=random_nickname_generator)
    profile_image = models.URLField(null=True)
    default_color = models.CharField(max_length=7, default=random_color_generator)
    introduction = models.CharField(max_length=300, default="", blank=True)

    joined_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    naver_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    kakao_id = models.CharField(max_length=100, blank=True, null=True, unique=True)

    notification_agreed = models.BooleanField(default=False)
    notification_agreed_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "username"

    def has_perm(self, perm, obj=None):  # pylint: disable=unused-argument
        return True

    def has_module_perms(self, app_label):  # pylint: disable=unused-argument
        return True

    objects = UserManager()

    def __str__(self):
        return f"{self.username} ({self.person.name})"  # pylint: disable=no-member

    class Meta:
        db_table = "user"
        verbose_name = "회원"
        verbose_name_plural = "회원"
