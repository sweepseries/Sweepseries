from django.db import models


class InquiryCategoryChoices(models.IntegerChoices):
    ## TODO: Add inquiry categories
    OTHER = 0, "기타"
    pass


class InquiryStatusChoices(models.IntegerChoices):
    PENDING = 1, "대기"
    IN_PROGRESS = 2, "진행중"
    COMPLETED = 3, "완료"
