from django.test import TestCase

from .models import Person


class PersonModelTest(TestCase):
    def setUp(self):
        self.person = Person.objects.create(
            name="Test User", phone_number="010-9999-9999"
        )

    def test_str(self):
        expected_str = "Test User"
        self.assertEqual(str(self.person), expected_str)
