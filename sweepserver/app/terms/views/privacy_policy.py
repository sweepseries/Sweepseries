from drf_spectacular.utils import extend_schema
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny

from ._utils import get_terms_from_query, get_terms_from_query_and_version


class PrivacyPolicyView(GenericAPIView):
    """
    개인정보 처리 방침
        - url: GET /v1/privacy_policy/
    """

    permission_classes = [AllowAny]
    http_method_names = ["get"]

    @extend_schema(summary="개인정보 처리 방침", tags=["약관 조회"])
    def get(self, request):
        """
        약관 조회
        """
        version = request.query_params.get("version", None)

        if version:
            return get_terms_from_query_and_version(
                "Catch B 개인정보 처리 방침", version
            )

        return get_terms_from_query("Catch B 개인정보 처리 방침")
