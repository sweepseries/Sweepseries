from unittest.mock import patch

from auth.user.models import User
from community.profiles.models import CommunityProfile
from core.tests.utils import CatchBAPITestCase


class PostAPITestCase(CatchBAPITestCase):
    """
    게시글 API 테스트 케이스.
    """

    fixtures = CatchBAPITestCase.fixtures + [
        "data/initial/forum.json",
        "data/test/community.json",
    ]

    def setUp(self):
        super().setUp()
        self.admin = User.objects.get(username="admin")
        self.author_profile = CommunityProfile.objects.get(user=self.normal_user)
        self.url = "/api/v1/posts/"
        self.data = {
            "forum_id": 1,
            "author_id": self.author_profile.id,
            "tag_id": 1,
            "title": "Test Post",
            "content": "This is a test post content.",
        }

    @patch("django.core.files.storage.default_storage.save")
    def test_create_post_success(self, mock_save):
        """
        게시글 생성 성공 테스트.
        """
        mock_save.return_value = "test.png"
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, 201)

    @patch("django.core.files.storage.default_storage.save")
    def test_create_post_with_image(self, mock_save):
        """
        이미지 파일을 포함한 게시글 생성 테스트.
        """
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

    @patch("community.post.serializers.simple_serializer.get_presigned_url")
    def test_post_list_success(self, mock_get_presigned_url):
        """
        게시글 목록 조회 성공 테스트.
        """
        mock_get_presigned_url.return_value = "http://example.com/test.png"

        ## 1. 기본
        response = self.client.get(self.url, {"forum": "덕아웃"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("results", response.data)
        self.assertEqual(len(response.data["results"]), 2)

        ## 2. 태그 필터링
        response = self.client.get(self.url, {"forum": "덕아웃", "tag": "KBO"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("results", response.data)
        self.assertEqual(len(response.data["results"]), 1)

        ## 3. 검색어 필터링
        response = self.client.get(self.url, {"forum": "덕아웃", "search": "이미지"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("results", response.data)
        self.assertEqual(len(response.data["results"]), 1)

    def test_post_list_fail_no_forum(self):
        """
        게시판을 선택하지 않았을 때 게시글 목록 조회 실패 테스트.
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "게시판을 선택해주세요.")

    @patch("community.post.serializers.simple_serializer.get_presigned_url")
    @patch("community.post.views.post_viewset.PostViewSet.paginate_queryset")
    def test_post_list_fail_no_paginator(self, mock_paginate, mock_get_presigned_url):
        """
        게시글 목록 조회 시 페이징 처리 실패 테스트.
        """
        mock_paginate.return_value = None
        mock_get_presigned_url.return_value = "http://example.com/test.png"

        response = self.client.get(self.url, {"forum": "덕아웃"})
        self.assertEqual(response.status_code, 200)
        self.assertNotIn("results", response.data)
        self.assertEqual(len(response.data), 2)

    def test_post_details_success(self):
        """
        게시글 상세 조회 성공 테스트.
        """
        ## 1. 로그인 한 유저 + 프로필 정보 제공
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.get(
            f"{self.url}20250101000001/", {"profile": self.author_profile.id}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.data)
        self.assertEqual(response.data["id"], 20250101000001)

        ## 1-1. 다시 조회
        response = self.client.get(
            f"{self.url}20250101000001/", {"profile": self.author_profile.id}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.data)

        ## 2. 로그인 한 유저 + 프로필 정보 제공하지 않음
        response = self.client.get(f"{self.url}20250101000001/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.data)

        ## 3. 로그인 하지 않은 유저
        self.client.logout()
        response = self.client.get(f"{self.url}20250101000001/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.data)
