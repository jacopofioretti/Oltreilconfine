from django.urls import path
from . import views

app_name = 'sito_oltreilconfine'

urlpatterns = [
    path('', views.home, name='home'),
    path('rassegna-stampa/', views.rassegna_stampa, name='rassegna_stampa'),
    path('galleria/', views.galleria, name='galleria'),
]
