from datetime import date
from django.db.transaction import atomic
from django.utils import timezone
from rest_framework import serializers

from auth.user.models import User
from .models import Withdrawal, WithdrawReasonChoices


class WithdrawalSerializer(serializers.ModelSerializer):
    reason = serializers.IntegerField(required=True)
    reason_text = serializers.CharField(required=True)

    class Meta:
        model = Withdrawal
        fields = [
            "reason",
            "reason_text",
        ]

    def validate_reason(self, value):
        if value not in [choice[0] for choice in WithdrawReasonChoices.choices]:
            raise serializers.ValidationError("유효하지 않은 사유입니다.")

        return value

    def validate_reason_text(self, value):
        ## At least 10 characters
        if len(value) < 10:
            raise serializers.ValidationError(
                "상세 사유는 최소 10자 이상이어야 합니다."
            )

        return value

    def calculate_membership_duration(self, user):
        """
        Calculate the membership duration in months.
        """
        # Assuming `joined_at` is a DateTimeField in the User model
        joined_at = user.joined_at
        current_date = timezone.now()

        # Calculate the difference in months
        months = (
            (current_date.year - joined_at.year) * 12
            + current_date.month
            - joined_at.month
        )

        return months

    def get_birth_year(self, user):
        """
        Get the birth year of the user.
        """
        # Assuming `birth_date` is a DateField in the User model
        # birth_date can be None, so handle that case
        if user.person.birth_date is None:
            return 0

        birth_date: date = user.person.birth_date
        return birth_date.year

    def set_data(self, instance: Withdrawal, user: User) -> Withdrawal:
        ## TODO: 1. 코치였으면 표시
        ## TODO: 2. 아카데미 사장님이었으면 표시
        if user.naver_id:
            instance.was_naver = True
        if user.kakao_id:
            instance.was_kakao = True

        instance.register_route = user.route
        instance.gender = user.person.gender
        instance.birth_year = self.get_birth_year(user)
        instance.was_member_for = self.calculate_membership_duration(user)

        instance.save()

        return instance

    def create(self, validated_data):
        """
        Create a new Withdrawal instance.
        """
        user = self.context["user"]

        with atomic():
            withdrawal = Withdrawal.objects.create(**validated_data)
            withdrawal = self.set_data(withdrawal, user)
            user.is_withdrawn = True
            user.save()

            return withdrawal
