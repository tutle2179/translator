from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.translate import translate_text

@api_view(["POST"])
def translate_api(request):
    text = request.data.get("text", "")

    if not text.strip():
        return Response({"error": "No text"}, status=400)

    result = translate_text(text)

    return Response({
        "result": result["text"],
        "engine": result["engine"]
    })
