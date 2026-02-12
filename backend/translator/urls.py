from django.urls import path
from .views import translate_api

urlpatterns = [
    path("translate/", translate_api),
]
