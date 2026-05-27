from django.contrib import admin
from .models import Category, Machine, QuoteRequest

admin.site.register(Category)
admin.site.register(Machine)
admin.site.register(QuoteRequest)