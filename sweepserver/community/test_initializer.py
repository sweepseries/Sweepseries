from core.tests.utils import CatchBAPITestCase


class CommunityInitializerAPITestCase(CatchBAPITestCase):
    fixtures = CatchBAPITestCase.fixtures + ["data/initial/forum.json"]

    def setUp(self):
        super().setUp()
        self.url = "/api/v1/community/initialize/"

    def test_community_initializer_no_auth(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("forums", response.data)

    def test_community_initializer_with_auth(self):
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("forums", response.data)
