from django.contrib import admin
from django.urls import path,include
from .views import careers

urlpatterns = [
      path('',careers,name="career"),

]