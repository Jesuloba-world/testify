from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse
import uuid


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True, max_length=250)
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    slug = models.SlugField(max_length=200, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Project, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("article_detail", kwargs={"slug": self.slug})

    def __str__(self):
        return self.title
