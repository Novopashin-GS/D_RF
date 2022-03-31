from rest_framework import mixins, viewsets
from usersapp.models import Users
from usersapp.serializers import UsersSerializer, UsersSerializer2


class UsersModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                        viewsets.GenericViewSet):
    def get_serializer_class(self):
        if self.request.version == '1.0.0':
            return UsersSerializer
        return UsersSerializer2
    queryset = Users.objects.all()
