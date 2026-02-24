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



def translate_text(text, target="DE"):
    try:
        result = translator.translate_text(
            text,
            source_lang="KO",
            target_lang=target,
        )

        print("DETECTED:", result.detected_source_lang)
        print("TRANSLATED TEXT:", result.text)

        return {
            "text": result.text,
            "engine": "DeepL"
        }

    except Exception as e:
        print("DeepL Failed:", e)
        fallback_text = hf_translate(text, target)

        return {
            "text": fallback_text,
            "engine": "HuggingFace"
        }
