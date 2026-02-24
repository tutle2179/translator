from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.translate import translate_text
from django.http import JsonResponse
from .models import TranslationHistory
from django.views.decorators.csrf import csrf_exempt
import json


@api_view(["POST"])
def translate_api(request):
    text = request.data.get("text", "")
    target_lang = request.data.get("target_lang", "DE")  # 기본 독일어

    if not text.strip():
        return Response({"error": "No text"}, status=400)

    result = translate_text(text, target_lang)

    return Response({
        "result": result["text"],
        "engine": result["engine"]
    })


# 저장
@csrf_exempt
def save_translation(request):
    if request.method == "POST":
        data = json.loads(request.body)

        history = TranslationHistory.objects.create(
            source_text=data["source_text"],
            translated_text=data["translated_text"],
            engine=data["engine"]
        )

        return JsonResponse({"message": "saved", "id": history.id})

# 목록 조회
def get_history(request):
    histories = TranslationHistory.objects.all().order_by("-created_at")

    data = [
        {
            "id": h.id,
            "source_text": h.source_text,
            "translated_text": h.translated_text,
            "engine": h.engine,
            "created_at": h.created_at,
        }
        for h in histories
    ]

    return JsonResponse(data, safe=False)

# 삭제
@csrf_exempt
def delete_history(request, id):
    TranslationHistory.objects.filter(id=id).delete()
    return JsonResponse({"message": "deleted"})

