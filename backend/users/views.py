from django.contrib.auth.models import User
from django.utils.decorators import method_decorator

from django_ratelimit.decorators import ratelimit

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
@ratelimit(key="ip", rate="3/m", method="POST", block=True)
def register_user(request):
    username = request.data.get("username", "").strip()
    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "")

    if not username or not email or not password:
        return Response(
            {
                "success": False,
                "message": "Username, email, and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if len(password) < 8:
        return Response(
            {
                "success": False,
                "message": "Password must be at least 8 characters long."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username__iexact=username).exists():
        return Response(
            {
                "success": False,
                "message": "Username already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email__iexact=email).exists():
        return Response(
            {
                "success": False,
                "message": "Email already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response(
        {
            "success": True,
            "message": "User created successfully.",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        },
        status=status.HTTP_201_CREATED
    )


@method_decorator(
    ratelimit(
        key="ip",
        rate="5/m",
        method="POST",
        block=True
    ),
    name="dispatch"
)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Invalid email/phone or password."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "success": True,
                "message": "Login successful.",
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                }
            },
            status=status.HTTP_200_OK
        )