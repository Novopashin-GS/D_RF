from usersapp.models import Users
from rest_framework.serializers import ModelSerializer


class UsersSerializer(ModelSerializer):

    class Meta:
        model = Users
        exclude = ['password', 'user_permissions']
