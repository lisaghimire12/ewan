import random

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from django.utils.decorators import method_decorator

from django_ratelimit.decorators import ratelimit

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .models import LoginOTP


@api_view(["POST"])
def register_user(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:

        return Response(
            {
                "success": False,
                "message": "All fields required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():

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
            "message": "User registered successfully."
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

        email = request.data.get("email")
        password = request.data.get("password")

        try:

            user_obj = User.objects.get(email=email)

        except User.DoesNotExist:

            return Response(
                {
                    "success": False,
                    "message": "User not found."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(
            username=user_obj.username,
            password=password
        )

        if not user:

            return Response(
                {
                    "success": False,
                    "message": "Invalid password."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        otp = str(random.randint(100000, 999999))

        LoginOTP.objects.filter(
            user=user,
            is_used=False
        ).update(is_used=True)

        LoginOTP.objects.create(
            user=user,
            otp=otp
        )

        print("================================")
        print(f"OTP for {user.email} is {otp}")
        print("================================")

        return Response(
            {
                "success": True,
                "message": "OTP sent.",
                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            }
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

        try:

            user = User.objects.get(email=email)

        except User.DoesNotExist:

            return Response(
                {
                    "success": False,
                    "message": "Invalid user."
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

            return Response(
                {
                    "success": False,
                    "message": "OTP expired."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        otp_record.is_used = True
        otp_record.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "success": True,

                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },

                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            }
        )