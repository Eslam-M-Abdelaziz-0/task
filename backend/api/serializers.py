from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Profile, Order


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # Create a Token for this user
        Token.objects.create(user=user)
        # Create a profile
        profile = Profile(user=user)
        profile.save()
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

    def create(self, validated_data):
        order = Order(**validated_data)
        # print("validated_data : >>>> ", validated_data['shipmentCompanyName'].id)
        profile = Profile.objects.get(id=validated_data['shipmentCompanyName'].id)
        order.price = order.weight * profile.pricePerKg
        # print('profile.pricePerKg : ', profile.pricePerKg)
        # print('order.price : ', order.price)
        order.save()
        return order

    def update(self, instance, validated_data):
        fields = instance._meta.fields
        exclude = []
        for field in fields:
            field = field.name.split('.')[-1]  # to get coulmn name
            if field in exclude:
                continue
            exec("instance.%s = validated_data.get(field, instance.%s)" % (field, field))

        # Update Price
        profile = Profile.objects.get(id=instance.shipmentCompanyName.id)
        instance.price = instance.weight * profile.pricePerKg

        instance.save()
        return instance


