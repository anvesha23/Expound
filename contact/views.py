from django.shortcuts import render,get_object_or_404,Http404,HttpResponseRedirect
from .forms import ContactForm
from .models import Contact
#for mails  
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
# Create your views here.

def imap(msg):
        from django.conf import settings
        import imaplib, time
        imap = imaplib.IMAP4_SSL(settings.EMAIL_HOST)
        # imap.starttls()
        imap.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        imap.append('Sent', '\\SEEN', imaplib.Time2Internaldate(time.time()), msg.encode())  
        imap.logout() 


def contact(request):
    #if not request.user.is_authenticated:
    #    raise Http404
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            #Sending email to hr 
            apply   =   Contact.objects.get(id=form.instance.id)
            subject = 'Contact request on expoundtechnivo.com'
            html_message = render_to_string('email_templates/contact_hr.html', {'apply': apply })
            plain_message = strip_tags(html_message)
            from_email = 'Expound Support <support@expoundtechnivo.com>'
            to = 'hr@expoundtechnivo.com'
            msg = EmailMultiAlternatives(subject, plain_message, from_email, [to])
            msg.attach_alternative(html_message, "text/html")
            msg.send()
            #Loads the email message to append it afterwards with IMAP
            msg = str(msg.message())
            imap(msg)
            
            #sending message to candidate
            subject = 'Following up on your recent application on expoundtechnivo.com'
            html_message = render_to_string('email_templates/contact_candidate.html', {'apply': apply })
            plain_message = strip_tags(html_message)
            from_email = 'Expound Support <support@expoundtechnivo.com>'
            to = apply.email
            msg = EmailMultiAlternatives(subject, plain_message, from_email, [to])
            msg.attach_alternative(html_message, "text/html")
            msg.send()
            #Loads the email message to append it afterwards with IMAP
            msg = str(msg.message())
            imap(msg)
            return HttpResponseRedirect('/contact/')
    else:
        form = ContactForm()
    return render(request,'Contact.html',{'form':form})