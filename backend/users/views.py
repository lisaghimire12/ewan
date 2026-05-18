import random

from django.contrib.auth.models import User
from django.utils.decorators import method_decorator

from django_ratelimit.decorators import ratelimit

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer
from .models import LoginOTP


@api_view(["POST"])
def register_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response(
            {"error": "Username, email, and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response(
        {
            "message": "User created successfully.",
            "username": user.username
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
    permission_classes = []

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

        otp = str(random.randint(100000, 999999))

        LoginOTP.objects.filter(user=user, is_used=False).update(is_used=True)

        LoginOTP.objects.create(
            user=user,
            otp=otp
        )

        print("====================================")
        print(f"OTP for {user.email} is {otp}")
        print("====================================")

        return Response(
            {
                "success": True,
                "message": "Login successful. OTP sent.",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                }
            },
            status=status.HTTP_200_OK
        )


@method_decorator(
    ratelimit(
        key="ip",
        rate="10/m",
        method="POST",
        block=True
    ),
    name="dispatch"
)
class VerifyOTPView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response(
                {
                    "success": False,
                    "message": "Email and OTP are required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "Invalid OTP."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        otp_record = LoginOTP.objects.filter(
            user=user,
            otp=otp,
            is_used=False
        ).last()

        if not otp_record:
            return Response(
                {
                    "success": False,
                    "message": "Invalid OTP."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if otp_record.is_expired():
            otp_record.is_used = True
            otp_record.save()

            return Response(
                {
                    "success": False,
                    "message": "OTP expired. Please login again."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        otp_record.is_used = True
        otp_record.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "success": True,
                "message": "OTP verified successfully.",
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