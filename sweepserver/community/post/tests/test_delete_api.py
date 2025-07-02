from ..models import Post
from .base_testcase import PostsAPITestCase

class PostDeleteAPITestCase(PostsAPITestCase):
    """
    게시글 API DELETE 테스트 케이스.
    """

    def test_delete_post_success(self):
        """
        게시글 삭제 성공 테스트.
        """
        post = Post.objects.first()
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.delete(f"{self.url}{post.id}/", headers=self.post_headers)
        self.assertEqual(response.status_code, 204)

    def test_delete_post_fail_unauthenticated(self):
        """
        인증되지 않은 사용자가 게시글을 삭제하려고 할 때 실패 테스트.
        """
        post = Post.objects.first()
        response = self.client.delete(f"{self.url}{post.id}/")
        self.assertEqual(response.status_code, 400)
