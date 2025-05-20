from django.test import TestCase

from ..models import FAQ


class FAQModelsTestCase(TestCase):
    def test_str(self):
        faq = FAQ.objects.create(
            question="Test FAQ",
            answer="This is a test FAQ content.",
        )
        self.assertEqual(str(faq), "기타 - Test FAQ")
