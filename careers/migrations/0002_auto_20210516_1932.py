# Generated by Django 3.1.2 on 2021-05-16 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apply',
            name='phone',
            field=models.CharField(max_length=10),
        ),
    ]