from django.contrib import admin

from .models import InquiryThread, InquiryMessage, InquiryCategory, InquiryStatus

admin.site.register(InquiryThread)
admin.site.register(InquiryMessage)
admin.site.register(InquiryCategory)
admin.site.register(InquiryStatus)
