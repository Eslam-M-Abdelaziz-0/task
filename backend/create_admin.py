from django.contrib.auth import get_user_model
import os

Account = get_user_model()
if Account.objects.count() == 0:
    username = os.environ.get("Admin_username", "admin")
    email = os.environ.get("Admin_email", "admin@admin.com")
    password =  os.environ.get("Admin_password", "admin")
    print('Creating account for %s (%s)' % (username, email))
    admin = Account.objects.create_superuser(email=email, username=username, password=password)
    admin.is_active = True
    admin.is_admin = True
    admin.save()
else:
    print('Admin accounts can only be initialized if no Accounts exist')

