from django.urls import path

from .views import SignupView, LoginView, UserInfoView, AdminDashboardView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='user-signup'),  # For user registration
    path('login/', LoginView.as_view(), name='user-login'),    # For user login
    path('me/', UserInfoView.as_view(), name='user-detail'),     # For user info after login
    path('dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),  # Admin dashboard
    path('update/<int:userId>/', AdminDashboardView.as_view(), name='user-update'),    # Admin updates user info
]