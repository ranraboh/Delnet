# Generated by Django 2.2.10 on 2020-08-11 20:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_merge_20200811_2311'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dataset',
            old_name='public_use',
            new_name='enable_offer',
        ),
    ]
