from auth.user.models import User
from community.profiles.models import CommunityProfile
from core.tests.utils import CatchBAPITestCase


class PostAPITestCase(CatchBAPITestCase):
    """
    게시글 API 테스트 케이스.
    """

    fixtures = CatchBAPITestCase.fixtures + ["data/initial/forum.json"]

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

    def test_create_post_success(self):
        """
        게시글 생성 성공 테스트.
        """
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, 201)

    def test_create_post_with_image(self):
        """
        이미지 파일을 포함한 게시글 생성 테스트.
        """
        self.client.force_authenticate(user=self.normal_user)
        data = {
            **self.data,
            "image_files": [
                self.uploaded_image_png,
            ],
        }
        response = self.client.post(self.url, data=data, format="multipart")
        self.assertEqual(response.status_code, 201)

    def test_create_post_unauthenticated(self):
        """
        입력받은 프로필과 현재 로그인한 사용자가 일치하지 않을 때
        """
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "잘못된 요청입니다.")
