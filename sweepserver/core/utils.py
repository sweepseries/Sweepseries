from django.conf import settings


def is_admin_page(request) -> bool:
    """
    Check if the request is for an admin page.
    """
    admin_page_url = settings.ADMIN_PAGE_URL
    return request.META.get("HTTP_ORIGIN") == admin_page_url
