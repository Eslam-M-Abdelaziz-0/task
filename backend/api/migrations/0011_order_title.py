# Generated by Django 4.0.1 on 2022-01-22 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_order_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='title',
            field=models.CharField(default='t1', max_length=50),
        ),
    ]
