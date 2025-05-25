from drf_spectacular.utils import extend_schema
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny

from ._utils import get_terms_from_query, get_terms_from_query_and_version


class TermsOfServiceView(GenericAPIView):
    """
    서비스 이용 약관
        - url: GET /v1/terms_of_service/
    """

    permission_classes = [AllowAny]
    http_method_names = ["get"]

    @extend_schema(summary="서비스 이용 약관", tags=["약관 조회"])
    def get(self, request):
        """
        약관 조회
        """
        version = request.query_params.get("version", None)

        if version:
            return get_terms_from_query_and_version("Catch B 서비스 이용약관", version)

        return get_terms_from_query("Catch B 서비스 이용약관")
