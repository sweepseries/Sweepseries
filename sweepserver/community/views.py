from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .forum.models import Forum
from .forum.serializers import ForumSerializer
from .profiles.models import CommunityProfile
from .profiles.serializers import CommunityProfileSerializer


class CommunityInitializerView(GenericAPIView):
    permission_classes = [AllowAny]
    http_method_names = ["get", "head", "options"]

    @extend_schema(summary="커뮤니티 초기 데이터", tags=["커뮤니티"])
    def get(self, request):  # pylint: disable=unused-argument
        forums = Forum.objects.all()
        forums_serializer = ForumSerializer(forums, many=True)

        user = request.user

        if user.is_authenticated:
            profiles = CommunityProfile.objects.filter(user=user)
            profiles_serializer = CommunityProfileSerializer(profiles, many=True)
        else:
            profiles_serializer = CommunityProfileSerializer(
                CommunityProfile.objects.none(), many=True
            )

        return Response(
            data={
                "forums": forums_serializer.data,
                "profiles": profiles_serializer.data,
            },
            status=status.HTTP_200_OK,
        )
