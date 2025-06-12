from rest_framework import serializers

from .models import Forum, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "icon"]


class ForumSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = ["id", "name"]


class ForumSerializer(ForumSimpleSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta(ForumSimpleSerializer.Meta):
        fields = ForumSimpleSerializer.Meta.fields + ["tags"]
