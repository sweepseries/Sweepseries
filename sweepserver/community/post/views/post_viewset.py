from drf_spectacular.utils import extend_schema
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from community.permissions import IsAuthor
from ..models import Post
from ..paginator import PostPaginator
from ..serializers import PostDetailSerializer, PostSimpleSerializer
from ._utils import create_post_read


class PostViewSet(ModelViewSet):
    """
    게시글 API
        - url: /v1/posts/
        - GET, POST, PATCH, DELETE
    """

    queryset = Post.objects.filter(is_deleted=False)
    serializer_class = PostSimpleSerializer
    pagination_class = PostPaginator
    permission_classes = [AllowAny]
    http_method_names = ["post", "get"]

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

    @extend_schema(summary="게시글 목록 조회", tags=["게시글"])
    def list(self, request, *args, **kwargs):
        """
        게시글 목록 조회
            - 게시글 목록을 조회할 때는 간단한 정보만 반환됨.
        """
        forum = request.query_params.get("forum", None)
        if not forum:
            return Response(
                {"error": "게시판을 선택해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        tag = request.query_params.get("tag", None)
        search = request.query_params.get("search", None)

        q = Q(forum__name=forum, is_deleted=False)
        if tag:
            q &= Q(tag__name=tag)
        if search:
            q &= Q(title__icontains=search) | Q(content__icontains=search)

        self.queryset = self.queryset.filter(q).distinct()
        page = self.paginate_queryset(self.queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="게시글 상세 조회", tags=["게시글"])
    def retrieve(self, request, *args, **kwargs):
        """
        게시글 상세 조회
            - 게시글의 상세 정보를 조회할 때 사용됨.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # 게시글 조회 수 증가
        instance.num_views += 1
        instance.save(update_fields=["num_views"])

        # 게시글 읽음 기록 생성
        if request.user.is_authenticated:
            create_post_read(request, instance)

        return Response(serializer.data, status=status.HTTP_200_OK)

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
