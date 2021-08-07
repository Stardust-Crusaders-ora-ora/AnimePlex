from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import LoginSerializer, RegistrationSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from django.contrib.auth import login as django_login, logout as django_logout
from rest_framework.authtoken.models import Token

# Create your views here.

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        django_login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=200)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(self, request):
    django_logout(request)
    return Response(status=204)

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"username":user.username, "password":user.password, "email":user.email})