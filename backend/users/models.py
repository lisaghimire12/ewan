from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


class Category(models.Model):

    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
    
class Machine(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="machines"
    )

    name = models.CharField(max_length=200)

    image = models.ImageField(upload_to="machines/")

    def __str__(self):
        return self.name
    
    
    
class QuoteRequest(models.Model):

    full_name = models.CharField(max_length=200)

    phone = models.CharField(max_length=20)

    email = models.EmailField()

    company_name = models.CharField(max_length=200)

    project = models.CharField(max_length=200)

    quantity = models.CharField(max_length=100)

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
    
    

class LoginOTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=3)

    def __str__(self):
        return f"OTP for {self.user.username}"