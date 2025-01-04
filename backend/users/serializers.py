from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=5, style={'input_type': 'password'})

    class Meta:
        model = User  # Make sure this points to your custom user model
        fields = ['id', 'name', 'email', 'password', 'phone_number', 'dob']
        extra_kwargs = {
            'id': {'read_only': True},  # ID should not be editable
            'email': {'required': True},  # Email is required
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Hash the password before saving
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)  # Hash the password before saving
        instance.save()
        return instance
