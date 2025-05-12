from rest_framework.permissions import BasePermission

from .utils import is_admin_page


class IsAuthenticated(BasePermission):
    """
    Custom permission to only allow authenticated users.
    """

    def has_permission(self, request, view) -> bool:
        """
        Check if the user is authenticated.
        """
        if (
            not request.user
            or not request.user.is_authenticated
            or not request.user.is_active
        ):
            return False
        if (
            request.user.is_blocked
            or request.user.is_withdrawn
            or not request.user.is_active
        ):
            return False
        return True


class AdminPageOnly(BasePermission):
    def has_permission(self, request, view) -> bool:
        """
        Check if the user is a superuser and the request is from the admin page.
        """
        if not request.user or not request.user.is_authenticated:
            return False

        return request.user.is_superuser and is_admin_page(request)
