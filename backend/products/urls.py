from django.urls import path
from .views import machine_list

urlpatterns = [
    path("machines/", machine_list),
]