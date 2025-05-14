from django.contrib import admin

from .models import InquiryThread, InquiryMessage

admin.site.register(InquiryThread)
admin.site.register(InquiryMessage)
