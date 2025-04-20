import re
from rest_framework.exceptions import ValidationError

from auth.person.models import Person


class PhoneNumberValidator:
    ## condition 1: phone numbers are unique
    ## condition 2: phone numbers must be in the correct format (반드시 010-xxxx-xxxx)

    def __call__(self, value):
        if not value:
            raise ValidationError("전화번호를 입력해주세요.")

        if Person.objects.filter(phone_number=value).exists():
            raise ValidationError("이미 가입된 전화번호입니다.")

        if not re.match(r"^010-\d{4}-\d{4}$", value):
            raise ValidationError("올바른 전화번호 형식이 아닙니다.")
