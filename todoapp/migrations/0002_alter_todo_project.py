# Generated by Django 3.2.12 on 2022-03-02 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='project',
            field=models.ManyToManyField(related_name='todo', to='todoapp.Project'),
        ),
    ]