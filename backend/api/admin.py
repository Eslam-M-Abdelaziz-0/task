from django.contrib import admin
from .models import Profile, Order, OrderRate

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'fName', 'lName', 'isShipmentCompany']
    list_filter = ['isShipmentCompany']

class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'status', 'price', 'weight', 'rate']
    list_filter = ['status']

class OrderRateAdmin(admin.ModelAdmin):
    list_display = ['order', 'user', 'stars']
    list_filter = ['stars']

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderRate, OrderRateAdmin)
