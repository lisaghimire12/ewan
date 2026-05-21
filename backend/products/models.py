from django.db import models

class Machine(models.Model):
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