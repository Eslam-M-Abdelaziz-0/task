from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator


class Profile(models.Model):
    user = models.OneToOneField(User, unique=True, db_index=True ,on_delete=models.CASCADE)
    fName = models.CharField(max_length=50, default='First Name')
    lName = models.CharField(max_length=50, default='Last Name')
    isShipmentCompany = models.BooleanField(default=False)
    companyName = models.CharField(max_length=50, default='Non')
    phone = models.CharField(max_length=11, validators=[RegexValidator(r'^\d{1,11}$')], null=True)
    pricePerKg = models.PositiveIntegerField(default=0)

    def __str__(self):
        if self.isShipmentCompany:
            return self.companyName
        else:
            return f"{self.user}: {self.fName} {self.lName}"


class Order(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('Order Confirmed', 'Order Confirmed'),
        ('Preparing', 'Preparing'),
        ('Picked by courier', 'Picked by courier'),
        ('Canceled', 'Canceled'),
        ('On the way', 'On the way'),
        ('Delivered', 'Delivered'),
        ('Completed', 'Completed'),
    )
    title = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shipmentCompanyName = models.ForeignKey(Profile, on_delete=models.CASCADE)
    sendFrom = models.TextField(max_length=500)
    sendTo = models.TextField(max_length=500)
    weight = models.PositiveIntegerField(validators=[MaxValueValidator(1000), MinValueValidator(.5)])   # kilogram
    price = models.PositiveIntegerField(blank=True, default=0)
    status=models.CharField(max_length=50,choices=STATUS, default='Pending')
    note = models.TextField(max_length=250, blank=True ,null=True)
    rate = models.PositiveIntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)], default=0)


    def __str__(self):
        return self.title


