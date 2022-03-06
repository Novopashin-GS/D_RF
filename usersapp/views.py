from rest_framework import mixins, viewsets
from usersapp.models import Users
from usersapp.serializers import UsersSerializer


class UsersModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                        viewsets.GenericViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
