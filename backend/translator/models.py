from django.db import models

class TranslationHistory(models.Model):
    source_text = models.TextField()
    translated_text = models.TextField()
    engine = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.source_text[:30]
