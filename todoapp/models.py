from django.db import models
from usersapp.models import Users


class Project(models.Model):
    name = models.CharField(max_length=128)
    url = models.SlugField(max_length=64, blank=True)
    users = models.ManyToManyField(Users, related_name='project')

    def __str__(self):
        return f'{self.name}'


class Todo(models.Model):
    project = models.ManyToManyField(Project, related_name='todo')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
