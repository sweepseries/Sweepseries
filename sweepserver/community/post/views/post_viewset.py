from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from community.permissions import IsAuthor
from ..models import Post
from ..serializers import PostDetailSerializer, PostSimpleSerializer


class PostViewSet(ModelViewSet):
    """
    게시글 API
        - url: /v1/posts/
        - GET, POST, PATCH, DELETE
    """

    queryset = Post.objects.filter(is_deleted=False)
    serializer_class = PostSimpleSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def get_serializer_class(self):
        if self.action in ["list"]:
            return PostSimpleSerializer
        return PostDetailSerializer

    def get_permission_classes(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny]
        if self.action in ["create"]:
            return [IsAuthenticated]
        return [IsAuthor]

    @extend_schema(summary="게시글 생성", tags=["게시글"])
    def create(self, request, *args, **kwargs):
        """
        게시글 생성
            - 게시글 작성 시, 이미지 업로드도 함께 처리됨.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
