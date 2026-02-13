from django.urls import path
from .views import translate_api, save_translation, get_history, delete_history

urlpatterns = [
    path("translate/", translate_api),
    path("save/", save_translation),
    path("history/", get_history),
    path("delete/<int:id>/", delete_history),
]


