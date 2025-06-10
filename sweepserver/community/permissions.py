from rest_framework.permissions import BasePermission


class IsAuthor(BasePermission):
    """
    게시글/댓글/대댓글 작성자만 접근할 수 있는 권한 클래스.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user is the author of the object
        return obj.author.user == request.user
