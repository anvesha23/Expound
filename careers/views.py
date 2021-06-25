from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Career,Apply
from .forms import ApplyForm
from django.contrib import messages

#for mails  
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
# Create your views here.

#Creates a copy of the email in the sent folder
def imap(msg):
        from django.conf import settings
        import imaplib, time
        imap = imaplib.IMAP4_SSL(settings.EMAIL_HOST)
        # imap.starttls()
        imap.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        imap.append('Sent', '\\SEEN', imaplib.Time2Internaldate(time.time()), msg.encode())  
        imap.logout() 

def careers(request):

    if request.method == 'POST':
        form = ApplyForm(request.POST,request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request,"We've received your application we will contact you soon!")
            #Sending email to hr 
            apply   =   Apply.objects.get(id=form.instance.id)
            subject = 'New Application on expoundtechnivo.com'
            html_message = render_to_string('email_templates/apply_hr.html', {'apply': apply })
            plain_message = strip_tags(html_message)
            from_email = 'Expound Support <support@expoundtechnivo.com>'
            to = 'hr@expoundtechnivo.com'
            msg = EmailMultiAlternatives(subject, plain_message, from_email, [to])
            msg.attach_alternative(html_message, "text/html")
            msg.attach_file(form.instance.resume.path)
            msg.send()
            #Loads the email message to append it afterwards with IMAP
            msg = str(msg.message())
            imap(msg)
            
            #sending message to candidate
            subject = 'Following up on your recent application on expoundtechnivo.com'
            html_message = render_to_string('email_templates/apply_candidate.html', {'apply': apply })
            plain_message = strip_tags(html_message)
            from_email = 'Expound Support <support@expoundtechnivo.com>'
            to = apply.email
            msg = EmailMultiAlternatives(subject, plain_message, from_email, [to])
            msg.attach_alternative(html_message, "text/html")
            msg.send()
            #Loads the email message to append it afterwards with IMAP
            msg = str(msg.message())
            imap(msg)

    else:
        form = ApplyForm()
    career = Career.objects.all()
    context = {
        'career':career,
        'form':form
        }
    return render(request,'Career.html',context)