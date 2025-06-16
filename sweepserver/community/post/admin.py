from django.contrib import admin

from .models import Post, PostImageAttachment, DailySequence, PostRead

admin.site.register(Post)
admin.site.register(PostImageAttachment)
admin.site.register(DailySequence)
admin.site.register(PostRead)
