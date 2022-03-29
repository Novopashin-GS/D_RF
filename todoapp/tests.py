from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase

from todoapp.views import ProjectModelViewSet
from usersapp.models import Users


class TestAPI(TestCase):
    def setUp(self) -> None:
        self.admin = Users.objects.create_superuser(username='admin', email='admin@example.com', password='admin')

    def test_projects_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 0)

    def test_todos_list(self):
        client = APIClient()
        response = client.get('/api/todos/')
        self.assertEqual(response.status_code, 401)
        client.login(username='admin', password='admin')
        response = client.get('/api/todos/')
        self.assertEqual(response.status_code, 200)
