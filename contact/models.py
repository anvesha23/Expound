from django.db import models

# Create your models here.

class Contact(models.Model):
    name        = models.CharField(max_length=100)
    email       = models.EmailField()
    subject     = models.CharField(max_length=100)
    message     = models.CharField(max_length=300)
    timestamp   = models.TimeField(auto_now=True)

    def __str__(self):
        return 'Name: %s Subject: %s'%(self.name,self.subject)
    