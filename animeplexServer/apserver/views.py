from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from numpy.lib.npyio import load
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
import numpy as np
import pandas as pd
from numpy import loadtxt
import requests
from . import models
import csv
# Create your views here.

indices = loadtxt('model.csv', delimiter=',')
anime_new = pd.read_csv('anime.csv', delimiter=',')
anime_list = anime_new[['anime_id', 'name', 'genre',
                        'type', 'episodes', 'rating', 'members']]


@api_view(['GET'])
def genreRec(request, username, pk):
    if request.method == 'GET':
        name = request.user.username
        name = username
        print(name)
        history = []
        recommendations = []
        rec_by_genre = []
        try:
            currUser = models.userRecommend.objects.get(name=name)
            for anime in currUser.mal_data["anime"]:
                history.append(anime["mal_id"])
            for anime in history:
                if anime < len(indices):
                    for rec in list(indices[anime][1:]):
                        if rec not in history:
                            recommendations.append(rec)
            recommendations.sort()

            # for anime in recommendations:
            #     print(anime_list[anime_list["anime_id"]
            #                      == anime]["genre"], type(anime_list[anime_list["anime_id"]
            #                                                          == anime]["genre"]))
            #     print(anime_list["genre"])
            #     if (anime in anime_list["anime_id"]) and (pk in anime_list[anime_list["anime_id"] == anime]["genre"]):
            #     if (anime in anime_list["anime_id"]) and (pk in anime_list["genre"]):
            #         for row in anime_list:
            #             if anime == row[0] and pk in row[2]:
            #         rec_by_genre.append(anime)

            with open('./anime.csv', newline='', encoding="utf8") as file:
                reader = csv.reader(file)
                res = list(map(tuple, reader))
                row = 1
                for anime in recommendations:
                    print("anime_id", anime)

                    while(1):

                        if int(res[row][0]) > int(anime):
                            break
                        print(res[row][2].split(', '))
                        if int(anime) == int(res[row][0]) and (pk in res[row][2].split(', ')):
                            print(res[row][0], res[row][2])
                            rec_by_genre.append(anime)
                            break
                        row += 1

            return Response({"rec_by_genre": rec_by_genre}, status=200)
        except models.userRecommend.DoesNotExist:
            return Response({"error": "New User"}, status=200)


@api_view(['GET'])
def getRec(request, username):
    if request.method == 'GET':
        name = username
        history = []
        recommendations = []
        try:
            currUser = models.userRecommend.objects.get(name=name)
            for anime in currUser.mal_data["anime"]:
                history.append(anime["mal_id"])
            for anime in history:
                if anime < len(indices):
                    for rec in list(indices[anime][1:]):
                        if rec not in history:
                            recommendations.append(rec)
            return Response({"recommendations": recommendations}, status=200)
        except models.userRecommend.DoesNotExist:
            return Response({"error": "New User"}, status=200)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        try:
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data["user"]
            django_login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=200)
        except:
            return Response({"error": "Not Registered"}, status=200)


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
        jikanres = requests.get(
            "https://api.jikan.moe/v3/user/" + user.username + "/animelist/all")
        malData = jikanres.json()
        if "error" not in malData:
            models.userRecommend.objects.create(
                name=user.username, mal_data=malData)
        return Response({"username": user.username, "password": user.password, "email": user.email})
