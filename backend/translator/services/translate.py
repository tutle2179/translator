# import deepl
# import os
# from .hf_translate import hf_translate

# translator = deepl.Translator(os.getenv("DEEPL_API_KEY"))

# def translate_text(text, source="KO", target="DE"):
#     result = translator.translate_text(
#         text,
#         source_lang=source,
#         target_lang=target,
#     )
#     return result.text

import deepl
import os
from .hf_translate import hf_translate

DEEPL_API_KEY = os.getenv("DEEPL_API_KEY")
translator = deepl.Translator(DEEPL_API_KEY)

def translate_text(text, source="KO", target="DE"):
    try:
        # 1️⃣ 1차: DeepL 시도
        result = translator.translate_text(
            text,
            source_lang=source,
            target_lang=target,
        )
        return {
            "text": result.text,
            "engine": "DeepL"
        }

    except Exception as e:
        # 2️⃣ DeepL 실패 → Hugging Face 자동 전환
        fallback_text = hf_translate(text)
        return {
            "text": fallback_text,
            "engine": "HuggingFace"
        }
