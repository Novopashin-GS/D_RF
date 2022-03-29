from rest_framework.test import APITestCase
from mixer.backend.django import mixer
from usersapp.models import Users


class TestAPI(APITestCase):
    def setUp(self) -> None:
        self.admin = Users.objects.create_superuser(username='admin', email='admin@example.com', password='admin')
        mixer.cycle(5).blend(Users)

    def test_users_list(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(len(response.data['results']), 6)
