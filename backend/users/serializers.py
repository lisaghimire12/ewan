from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(
        required=True,
        trim_whitespace=True
    )
    password = serializers.CharField(
        required=True,
        write_only=True,
        trim_whitespace=False
    )

    def validate(self, data):
        identifier = data.get("identifier")
        password = data.get("password")

        if not identifier or not password:
            raise serializers.ValidationError(
                "Invalid email/phone or password."
            )

        user = None

        if "@" in identifier:
            try:
                found_user = User.objects.get(email__iexact=identifier)
                user = authenticate(
                    username=found_user.username,
                    password=password
                )
            except User.DoesNotExist:
                pass
        else:
            user = authenticate(
                username=identifier,
                password=password
            )

        if user is None:
            raise serializers.ValidationError(
                "Invalid email/phone or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "Invalid email/phone or password."
            )

        data["user"] = user
        return data