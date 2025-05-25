from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import TermsAndConditions, TermsAndConditionsHistory


class TermsAndConditionsAPITestCase(APITestCase):
    """
    약관 API 테스트
        - 비고: 테스트 데이터에 있는 모든 약관은 2025-04-17에 생성, 최종 수정되었다.
    """

    fixtures = ["data/test/terms.json"]

    def setUp(self):
        self.url = "/v1/terms/"

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_agreements_retrieve(self):
        response = self.client.get(self.url + "1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_privacy_policy(self):
        ## 1. normal
        response = self.client.get("/v1/privacy_policy/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. with version (valid)
        response = self.client.get("/v1/privacy_policy/?version=2025-04-17")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["content"], "Sample Content")

    def test_privacy_policy_fail(self):
        ## 1. with version (DNE)
        response = self.client.get("/v1/privacy_policy/?version=2025-01-01")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "존재하지 않는 약관입니다.")

    def test_terms_of_service(self):
        ## 1. normal
        response = self.client.get("/v1/terms_of_service/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. with version (valid)
        response = self.client.get("/v1/terms_of_service/?version=2025-04-17")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["content"], "서비스 이용약관 내용")

    def test_terms_of_service_fail(self):
        ## 1. with version (DNE)
        response = self.client.get("/v1/terms_of_service/?version=2025-01-11")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "존재하지 않는 약관입니다.")

        ## 2. bad version format
        response = self.client.get("/v1/terms_of_service/?version=2025-01")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"], "version은 YYYY-MM-DD 형식으로 입력해야 합니다."
        )

    def test_dne(self):
        ## SHOULD NOT HAPPEN IN PRODUCTION
        ## ONLY FOR COVERAGE
        TermsAndConditions.objects.all().delete()
        TermsAndConditionsHistory.objects.all().delete()

        response = self.client.get("/v1/terms_of_service/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "존재하지 않는 약관입니다.")


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
