from django.core.management import BaseCommand
from usersapp.models import Users


class Command(BaseCommand):
    def handle(self, *args, **options):
        superuser = Users.objects.create_superuser(
            username='django',
            first_name='George',
            last_name='Novopashin',
            email='geekbrains@gb.local',
            password='geekbrains'
        )
        user_1 = Users.objects.create_user(
            username='lol',
            first_name='Alex',
            last_name='Zhukov',
            email='geekbrains1@gb.local',
            password='geekbrains'
        )
        user_2 = Users.objects.create_user(
            username='kek',
            first_name='Kir',
            last_name='Anuf',
            email='geekbrains2@gb.local',
            password='geekbrains'
        )
