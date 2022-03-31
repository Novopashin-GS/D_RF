from usersapp.models import Users
from rest_framework.serializers import ModelSerializer


class UsersSerializer(ModelSerializer):

    class Meta:
        model = Users
        exclude = ['password', 'user_permissions', 'is_superuser', 'is_staff', 'last_login']


class UsersSerializer2(ModelSerializer):

    class Meta:
        model = Users
        exclude = ['password', 'user_permissions',  'last_login']
