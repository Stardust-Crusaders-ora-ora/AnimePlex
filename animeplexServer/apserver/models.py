from django.db import models

# Create your models here.


class userRecommend(models.Model):
    name = models.CharField(max_length=512)
    mal_data = models.JSONField(blank=True)
