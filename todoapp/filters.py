from django_filters import rest_framework as filters
from todoapp.models import Project, Todo


class ProjectFilter(filters.FilterSet):

    class Meta:
        model = Project
        fields = {
            'name': ['contains']
        }


class TodoFilter(filters.FilterSet):

    class Meta:
        model = Todo
        fields = {
            'created_at': ['gt', 'lt'],
            'project': ['exact']
        }
