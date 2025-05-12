from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from core.permissions import IsAuthenticated
from .serializers import WithdrawalSerializer


class WithdrawalView(GenericAPIView):
    """
    회원 탈퇴 API
        - url: POST /v1/withdrawal/
    """

    permission_classes = [IsAuthenticated]
    http_method_names = ["post"]

    def check_permission(self, user, uuid):
        """
        1. 유저 본인인지 확인하고 (IsAuthenticated에서 미리 확인)
        2. 유저가 탈퇴할 수 있는 상태인지 확인한다.
        """
        if not uuid:
            return False

        if str(user.uuid) != uuid:
            return False

        return True

    def post(self, request):
        # pylint: disable=unused-argument

        ## 1. Permission을 확인하고
        user = request.user
        uuid = request.data.get("uuid", None)
        if not self.check_permission(user, uuid):
            return Response(status=403)

        ## 2. Serializer를 통해 데이터를 검증한다.
        serializer = WithdrawalSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.context["user"] = user

        serializer.save()

        ## 4. 성공하면, 204 No Content를 반환한다.
        return Response(status=204)
