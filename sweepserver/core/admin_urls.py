from rest_framework.routers import DefaultRouter

from app.announcement.views import AnnouncementAdminViewSet
from app.faq.views import FAQAdminViewSet
from app.inquiry.views import AdminInquiryViewSet
from app.terms.views import AdminTermsViewSet


router = DefaultRouter()

router.register(
    r"v1/announcements", AnnouncementAdminViewSet, basename="admin-announcements"
)
router.register(r"v1/faqs", FAQAdminViewSet, basename="admin-faqs")
router.register(r"v1/inquiries", AdminInquiryViewSet, basename="admin-inquiries")
router.register(r"v1/terms", AdminTermsViewSet, basename="admin-terms")

urlpatterns = []

urlpatterns += router.urls
