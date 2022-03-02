from rest_framework.viewsets import ModelViewSet
from todoapp.models import Project, Todo
from todoapp.serializers import ProjectSerializer, TodoSerializer


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TodoModelViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
