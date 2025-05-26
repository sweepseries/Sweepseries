from django.conf import settings
from rest_framework.test import APITestCase

from auth.user.models import User


class AdminPageAPITestCase(APITestCase):
    """
    Base class for API tests that require admin privileges.
    """

    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.admin = User.objects.get(username="admin")
        self.normal_user = User.objects.get(username="testuser")
        self.admin_page = settings.ADMIN_PAGE_URL
