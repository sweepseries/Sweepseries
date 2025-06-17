from unittest.mock import patch

from ..models import Post
from .base_testcase import PostsAPITestCase


class PostAPITestCase(PostsAPITestCase):
    """
    게시글 API POST 테스트 케이스.
    """

    @patch("community.post.serializers.image_serializer.get_presigned_url")
    @patch("django.core.files.storage.default_storage.save")
    def test_create_post_success(self, mock_save, mock_get_presigned_url):
        """
        게시글 생성 성공 테스트.
        """
        mock_get_presigned_url.return_value = "http://example.com/test.png"
        mock_save.return_value = "test.png"
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, 201)

    @patch("community.post.serializers.image_serializer.get_presigned_url")
    @patch("django.core.files.storage.default_storage.save")
    def test_create_post_with_image(self, mock_save, mock_get_presigned_url):
        """
        이미지 파일을 포함한 게시글 생성 테스트.
        """
        mock_get_presigned_url.return_value = "http://example.com/test.png"
        mock_save.return_value = "test.png"
        self.client.force_authenticate(user=self.normal_user)
        data = {
            **self.data,
            "image_files": [
                self.uploaded_image_png,
            ],
        }
        response = self.client.post(self.url, data=data, format="multipart")
        self.assertEqual(response.status_code, 201)

    def test_create_post_fail_unauthenticated(self):
        """
        입력받은 프로필과 현재 로그인한 사용자가 일치하지 않을 때
        """
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")

    def test_like_post_success(self):
        """
        게시글 좋아요 성공 테스트.
        """
        post = Post.objects.first()
        ## 1. like
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.post(
            f"{self.url}{post.id}/like/", {"profile": self.author_profile.id}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(post.likes.count(), 1)

        ## 2. unlike
        response = self.client.post(
            f"{self.url}{post.id}/like/", {"profile": self.author_profile.id}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(post.likes.count(), 0)

    def test_like_post_fail(self):
        """
        게시글 좋아요 실패 테스트.
        """
        post = Post.objects.first()
        ## 1. 프로필 정보 제공하지 않음
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.post(f"{self.url}{post.id}/like/")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "프로필이 지정되지 않았습니다.")

        ## 2. 프로필 정보가 잘못됨
        response = self.client.post(f"{self.url}{post.id}/like/", {"profile": 9999})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "프로필이 존재하지 않습니다.")
