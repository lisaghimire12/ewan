from django.urls import path
from .views import machine_list

urlpatterns = [

    path(
        "machines/<str:category_name>/",
        machine_list,
    ),

]