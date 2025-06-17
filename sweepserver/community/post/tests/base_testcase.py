from auth.user.models import User
from community.profiles.models import CommunityProfile
from core.tests.utils import CatchBAPITestCase


class PostsAPITestCase(CatchBAPITestCase):
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
