from rest_framework.serializers import ModelSerializer, StringRelatedField
from todoapp.models import Project, Todo


class ProjectSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(ModelSerializer):
    user = StringRelatedField()
    project = ProjectSerializer(many=True)

    class Meta:
        model = Todo
        fields = '__all__'
