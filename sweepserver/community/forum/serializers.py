from rest_framework import serializers

from .models import Forum, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "icon", "color", "background_color"]


class ForumSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Forum
        fields = ["id", "name", "tags"]
