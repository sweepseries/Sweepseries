from django.test import TestCase

from ..models import TermsAndConditions, TermsAndConditionsHistory


class TermsAndConditionsModelsTestCase(TestCase):
    """
    약관 모델 테스트
    """

    fixtures = ["data/test/terms.json"]

    def test_terms_str(self):
        terms = TermsAndConditions.objects.get(id=1)
        self.assertEqual(str(terms), "1. 만 14세 이상입니다.")

    def test_terms_history_str(self):
        terms_history = TermsAndConditionsHistory.objects.get(id=1)
        self.assertEqual(str(terms_history), "만 14세 이상입니다. - 2025-04-17")
