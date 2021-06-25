from django.db import models

# Create your models here.


class Career(models.Model):
    job_title        = models.CharField(max_length=100)
    job_description  = models.TextField(blank=True,max_length=500)
    experience       = models.TextField(blank=True)
    location         = models.CharField(max_length=300)
    qualification    = models.CharField(blank=True,max_length=100)
    skills_required  = models.CharField(blank=True,max_length=100)
    modules          = models.CharField(blank=True,max_length=100)
    projects         = models.CharField(blank=True,max_length=100)


    def __str__(self):
        return 'Job Description: %s '%(self.job_title)
    
#for job applications
class Apply(models.Model):
    name        = models.CharField(max_length=100)
    email       = models.EmailField()
    phone       = models.CharField(max_length=10)
    job         = models.ForeignKey(Career,on_delete=models.CASCADE)
    resume      = models.FileField()

    def __str__(self):
        return 'Name: %s Job applied for %s' %(self.name,self.job.job_title)
