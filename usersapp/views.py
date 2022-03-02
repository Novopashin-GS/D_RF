from usersapp.models import Users
from usersapp.serializers import UsersSerializer
from rest_framework.viewsets import ModelViewSet


class UsersModelViewSet(ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
