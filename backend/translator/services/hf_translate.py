from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL_NAME = "Helsinki-NLP/opus-mt-ko-de"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

def hf_translate(text: str) -> str:
    inputs = tokenizer(text, return_tensors="pt", padding=True)
    outputs = model.generate(**inputs, max_length=512)
    translated = tokenizer.batch_decode(outputs, skip_special_tokens=True)
    return translated[0]
