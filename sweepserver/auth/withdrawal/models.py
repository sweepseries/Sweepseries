from django.db import models

from auth.person.models import GenderChoices
from auth.user.enums import RegisterRouteChoices
from core.models import TimeStampedModel


class WithdrawReasonChoices(models.IntegerChoices):
    UNDEFINED = 0, "미입력"
    RECORDS = 1, "기록 삭제"
    PERSONAL_INFO = 2, "개인정보 유출"
    INACTIVITY = 3, "비활동"
    INCONVENIENCE = 4, "불편함"
    ANOTHER = 5, "다른 서비스 이용"
    ERRORS = 6, "오류"
    OTHER = 7, "기타"


class Withdrawal(TimeStampedModel):
    """
    회원 탈퇴 모델
    """

    reason = models.IntegerField(
        choices=WithdrawReasonChoices.choices, default=WithdrawReasonChoices.UNDEFINED
    )
    reason_text = models.CharField(max_length=255, default="", blank=True)

    was_coach = models.BooleanField(default=False)
    was_owner = models.BooleanField(default=False)
    was_naver = models.BooleanField(default=False)
    was_kakao = models.BooleanField(default=False)
    was_member_for = models.IntegerField(default=0)  ## 가입 기간 (개월 단위)

    register_route = models.IntegerField(
        choices=RegisterRouteChoices.choices, default=RegisterRouteChoices.CATCHB
    )

    birth_year = models.PositiveSmallIntegerField(default=0)
    gender = models.CharField(
        max_length=1, choices=GenderChoices.choices, default=GenderChoices.UNDEFINED
    )

    class Meta:
        db_table = "withdrawal"
        verbose_name = "회원 탈퇴"
        verbose_name_plural = "회원 탈퇴"
