from django.contrib import admin
from .models import Machine
from .models import QuoteRequest


admin.site.register(QuoteRequest)
admin.site.register(Machine)