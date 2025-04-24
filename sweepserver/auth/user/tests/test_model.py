from django.test import TestCase

from auth.person.models import Person
from ..models import User


class UserModelTest(TestCase):
    def setUp(self):
        person = Person.objects.create(name="Test User", phone_number="010-9999-9999")
        self.user = User.objects.create_superuser(
            username="testadmin",
            email="test@admin.com",
            password="testpassword",
            person=person,
        )

    def test_str(self):
        expected_str = "testadmin (Admin)"
        self.assertEqual(str(self.user), expected_str)

    def test_has_perm(self):
        self.assertTrue(self.user.has_perm("auth.change_user"))

    def test_has_module_perms(self):
        self.assertTrue(self.user.has_module_perms("auth"))

    def test_create_superuser(self):
        self.assertEqual(self.user.username, "testadmin")
