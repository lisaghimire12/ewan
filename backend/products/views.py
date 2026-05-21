from django.http import JsonResponse
from .models import Machine

def machine_list(request):

    machines = Machine.objects.all()

    data = []

    for machine in machines:

        data.append({
            "id": machine.id,
            "name": machine.name,
            "image": request.build_absolute_uri(machine.image.url)
            if machine.image else "",
        })

    return JsonResponse(data, safe=False)