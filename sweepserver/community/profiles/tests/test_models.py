from django.test import TestCase

from auth.user.models import User
from ..models import CommunityProfile


class CommunityProfileModelsTest(TestCase):
    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.user = User.objects.get(username="testuser")
        self.profile = CommunityProfile.objects.create(
            user=self.user,
            profile_name="TestUser Profile",
            is_default=True,
        )

    def test_community_profile_str(self):
        self.assertEqual(str(self.profile), "testuser - TestUser Profile")

    def test_community_profile_is_active(self):
        self.assertTrue(self.profile.is_active)

        self.profile.is_blocked = True
        self.assertFalse(self.profile.is_active)

        self.profile.is_blocked = False
        self.profile.is_deleted = True
        self.assertFalse(self.profile.is_active)

        self.profile.is_deleted = False
        self.assertTrue(self.profile.is_active)
