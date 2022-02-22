from users.models import Users
from rest_framework.serializers import ModelSerializer


class UsersSerializer(ModelSerializer):

    class Meta:
        model = Users
        fields = '__all__'
