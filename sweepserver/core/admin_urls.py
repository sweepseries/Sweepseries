from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter

from app.announcement.views import AnnouncementAdminViewSet


router = DefaultRouter()

router.register(
    r"announcements", AnnouncementAdminViewSet, basename="admin-announcements"
)

urlpatterns = [
    path("", admin.site.urls),  ## 가장 마지막에 위치해야 함
]

urlpatterns += router.urls
