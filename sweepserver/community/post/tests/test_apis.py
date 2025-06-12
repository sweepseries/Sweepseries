from core.tests.utils import CatchBAPITestCase

from community.profiles.models import CommunityProfile

class PostAPITestCase(CatchBAPITestCase):
    """
    게시글 API 테스트 케이스.
    """

    def setUp(self):
        super().setUp()
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
