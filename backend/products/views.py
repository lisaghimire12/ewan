from django.http import JsonResponse
from .models import Machine


def machine_list(request, category_name):

    machines = Machine.objects.filter(
        category__name=category_name
    )

    data = []

    for machine in machines:

        data.append({
            "id": machine.id,
            "name": machine.name,

            "image": f"http://192.168.1.68:8000{machine.image.url}"
            if machine.image else "",

        })

    return JsonResponse(data, safe=False)