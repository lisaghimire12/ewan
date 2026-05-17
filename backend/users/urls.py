from django.urls import path
from .views import register_user
from .views import LoginView

urlpatterns = [
    path('register/', register_user),
    path("login/", LoginView.as_view(), name="login"),
]

