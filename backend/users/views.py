from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser

User = get_user_model()

# Signup View (No authentication needed)
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Create a new user based on the provided data
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, username=email, password=password)

        if user:
            # Generate a refresh token and access token for the user
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "access": str(refresh.access_token),  # Access token
                "refresh": str(refresh),  # Refresh token (optional)
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# User Information View (Authentication required)
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)

        # Add 'is_superuser' to the response data
        user_data = serializer.data
        user_data["is_superuser"] = user.is_superuser

        return Response(user_data, status=status.HTTP_200_OK)



class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return Response({"error": "You do not have permission to access this resource."}, status=status.HTTP_403_FORBIDDEN)

        # Fetch all users
        users = User.objects.all()
        user_data = UserSerializer(users, many=True).data
        return Response(user_data)

    def put(self, request, userId, *args, **kwargs):
        if not request.user.is_superuser:
            return Response({"error": "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)

        # Fetch user using the userId passed in the URL
        try:
            user = User.objects.get(id=userId)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Here you can update the user with the provided data
        # For example, updating name, phone number, or dob (excluding email)
        user.name = request.data.get("name", user.name)
        user.dob = request.data.get("dob", user.dob)
        user.phone_number = request.data.get("phone_number", user.phone_number)

        # Save the updated user
        user.save()

        # Return a success message
        return Response({"message": f"User {userId} updated successfully."}, status=status.HTTP_200_OK)
