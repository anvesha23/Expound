from django import forms
from django.core.exceptions import ValidationError
from .models import Apply

class ApplyForm(forms.ModelForm):
    class Meta():
        model = Apply
        fields = ['name','email','phone','job','resume']