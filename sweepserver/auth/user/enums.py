from django.db import models


class RegisterRouteChoices(models.IntegerChoices):
    CATCHB = 0, "캐치비"
    NAVER = 1, "네이버"
    KAKAO = 2, "카카오"
