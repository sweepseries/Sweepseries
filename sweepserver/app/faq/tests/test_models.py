from django.test import TestCase

from ..models import FAQ, FAQCategory


class FAQModelsTestCase(TestCase):
    def test_str(self):
        category = FAQCategory.objects.create(name="기타")
        faq = FAQ.objects.create(
            category=category,
            question="Test FAQ",
            answer="This is a test FAQ content.",
        )
        self.assertEqual(str(category), "기타")
        self.assertEqual(str(faq), "기타 - Test FAQ")
