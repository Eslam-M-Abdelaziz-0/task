from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Profile, Order, OrderRate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'fName', 'lName', 'isShipmentCompany',
                  'companyName', 'phone', 'pricePerKg')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'title', 'user', 'shipmentCompanyName', 'sendFrom',
                  'sendTo', 'weight', 'price', 'status', 'note', 'rate')


class OrderRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderRate
        fields = ('id', 'user', 'order', 'stars')
