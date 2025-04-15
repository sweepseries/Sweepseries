import logging
import random
import requests
from django.conf import settings
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import APIException, ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from auth.person.models import Person
from .models import PhoneVerification

logger = logging.getLogger(__name__)


class RequestVerificationCodeView(GenericAPIView):
    """
    휴대폰 인증번호 요청 API
        - url: POST /v1/phone/code/
    """

    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def generate_verification_code(self):
        return f"{random.randint(0, 999999):06}"

    def send_verification_code_using_aligo(self, phone_number, code):
        try:
            res = requests.post(
                "https://apis.aligo.in/send/",
                headers={
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data={
                    "key": settings.SMS_API_KEY,
                    "user_id": "sweepseries",
                    "sender": "15771485",
                    "receiver": phone_number,
                    "msg": f"[스윕시리즈] 회원가입을 위한 인증번호 [{code}]를 입력해주세요.",
                    "testmode_yn": settings.SMS_MESSAGING_MODE,
                },
                timeout=5,
            )
            res.raise_for_status()
        except requests.RequestException as e:
            logger.error("SMS API call failed: %s", e)
            raise APIException("인증번호 발송에 실패했습니다.") from e

        if int(res.json()["result_code"]) != 1:
            raise APIException("인증번호 발송에 실패했습니다.")

    @extend_schema(summary="전화번호 인증번호 요청", tags=["전화번호 인증"])
    def post(self, request):
        """
        휴대폰 인증번호 요청
            - 전화번호를 입력받아 인증번호를 발급한다.
            - 인증번호는 임의의 6자리 숫자로 생성된다.
            - 인증번호는 발급 후 3분 이내에 사용해야 한다.
            - 인증번호를 알리고를 통해 전송한다.
        """
        phone_number = request.data.get("phone", None)

        if not phone_number:
            raise ValidationError("전화번호를 입력해주세요.")

        if Person.objects.filter(phone_number=phone_number).exists():
            raise ValidationError("이미 가입된 전화번호입니다.")

        code = self.generate_verification_code()

        self.send_verification_code_using_aligo(phone_number, code)

        PhoneVerification.objects.create(
            phone_number=phone_number, verification_code=code
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class VerifyCodeView(GenericAPIView):
    """
    휴대폰 인증번호 확인 API
        - url: POST /v1/phone/code/verify/
    """

    permission_classes = [AllowAny]
    http_method_names = ["post"]

    @extend_schema(summary="전화번호 인증 확인", tags=["전화번호 인증"])
    def post(self, request):
        """
        휴대폰 인증번호 확인
            - 전화번호와 인증번호를 입력받아 인증번호를 확인한다.
            - 입력된 전화번호에 대해서 가장 최근에 발급된 인증번호와 일치하는지, 그리고 발급한지 3분 이내인지 확인한다.
        """
        phone_number = request.data.get("phone", None)
        verification_code = request.data.get("code", None)

        if not phone_number or not verification_code:
            raise ValidationError("전화번호와 인증번호를 입력해주세요.")

        phone_verification = (
            PhoneVerification.objects.filter(phone_number=phone_number)
            .order_by("-created_at")
            .first()
        )

        if phone_verification is None:
            raise ValidationError("인증번호를 찾을 수 없습니다.")

        if phone_verification.verification_code != verification_code:
            raise ValidationError("인증번호가 일치하지 않습니다.")

        ## Check if the code is expired: 3 minutes
        if (timezone.now() - phone_verification.created_at).seconds > 180:
            raise ValidationError("인증번호가 만료되었습니다.")

        return Response(status=status.HTTP_204_NO_CONTENT)
