from io import BytesIO
from PIL import Image as PilImage
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase

from auth.user.models import User


class AdminPageAPITestCase(APITestCase):
    """
    Base class for API tests that require admin privileges.
    """

    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.admin = User.objects.get(username="admin")
        self.normal_user = User.objects.get(username="testuser")
        self.admin_page = settings.ADMIN_PAGE_URL


def generate_test_image_file():
    image_file = BytesIO()
    pil_image = PilImage.new("RGB", (100, 100), color="red")
    pil_image.save(image_file, format="PNG")
    image_file.seek(0)

    return SimpleUploadedFile(
        "test1.png", image_file.getvalue(), content_type="image/png"
    )


class CatchBAPITestCase(APITestCase):
    """
    테스트용 CatchB API 테스트 케이스.
    """

    fixtures = ["data/test/auth.json"]

    def setUp(self):
        self.normal_user = User.objects.get(username="testuser")
        self.uploaded_image_png = generate_test_image_file()
