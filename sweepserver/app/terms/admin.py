from django.contrib import admin

from .models import TermsAndConditions, TermsAndConditionsHistory

admin.site.register(TermsAndConditions)
admin.site.register(TermsAndConditionsHistory)
