from django.db import models


class Forum(models.Model):
    name = models.CharField(max_length=255, unique=True)

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "community_forum"
        verbose_name = "커뮤니티 게시판"
        verbose_name_plural = "커뮤니티 게시판"


class Tag(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name="tags")
    name = models.CharField(max_length=100)

    icon = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=7, default="#FFFFFF")
    background_color = models.CharField(max_length=7, default="#F0F0F0")

    objects = models.Manager()

    def __str__(self):
        return f"[{self.forum.name}] - {self.name}"

    class Meta:
        db_table = "community_tag"
        verbose_name = "커뮤니티 태그"
        verbose_name_plural = "커뮤니티 태그"
        unique_together = ("forum", "name")
        ordering = ["id"]
