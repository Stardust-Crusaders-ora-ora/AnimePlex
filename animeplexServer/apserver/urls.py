from django.contrib import admin
from django.urls import path
from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('register', views.register, name='register'),
    path('recommendations/<str:username>/<str:pk>', views.genreRec, name='genre'),
    path('recommend/<str:username>', views.getRec, name='rec')
]
