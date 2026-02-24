from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# 언어별 모델 매핑
MODEL_MAP = {
    "DE": "Helsinki-NLP/opus-mt-ko-de",
    "FR": "Helsinki-NLP/opus-mt-ko-fr",
    "ES": "Helsinki-NLP/opus-mt-ko-es",
}

# 모델 캐시 (한 번만 로드)
loaded_models = {}


def hf_translate(text: str, target_lang: str) -> str:
    model_name = MODEL_MAP.get(target_lang, "Helsinki-NLP/opus-mt-ko-de")

    # 모델이 아직 로드 안 되어 있으면 로드
    if model_name not in loaded_models:
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        loaded_models[model_name] = (tokenizer, model)

    tokenizer, model = loaded_models[model_name]

    inputs = tokenizer(text, return_tensors="pt", padding=True)
    outputs = model.generate(**inputs, max_length=512)
    translated = tokenizer.batch_decode(outputs, skip_special_tokens=True)

    return translated[0]