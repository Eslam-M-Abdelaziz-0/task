from django.urls import path, include
from rest_framework import routers
from .views import ProfileViewSet, OrderViewSet, OrderRateViewSet, UserViewSet


router = routers.DefaultRouter()
router.register('profile', ProfileViewSet)
router.register('order', OrderViewSet)
router.register('orderRate', OrderRateViewSet)
router.register('user', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]