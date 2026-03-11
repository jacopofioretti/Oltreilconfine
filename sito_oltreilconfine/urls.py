from django.urls import path
from . import views

app_name = 'sito_oltreilconfine'

urlpatterns = [
    path('', views.home, name='home'),
]
