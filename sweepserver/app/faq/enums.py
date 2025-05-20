from django.db import models


class FAQCategoryChoices(models.IntegerChoices):
    EVENTS = 1, "이벤트"
    ACADEMY = 2, "아카데미"
    LESSONS = 3, "레슨"
    PROMODE = 4, "프로모드"
    OTHERS = 5, "기타"
