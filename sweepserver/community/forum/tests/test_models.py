from django.test import TestCase

from ..models import Forum, Tag


class ForumModelsTest(TestCase):
    def setUp(self):
        self.forum = Forum.objects.create(name="Test Forum")

    def test_forum_str(self):
        self.assertEqual(str(self.forum), "Test Forum")

        with self.assertRaises(Exception):
            Forum.objects.create(name="Test Forum")

    def test_tag_str(self):
        tag = Tag.objects.create(forum=self.forum, name="Test Tag")
        self.assertEqual(str(tag), "[Test Forum] - Test Tag")
