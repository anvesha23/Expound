"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView

#static files url
from django.conf import settings
from django.conf.urls.static import static

#import urls from django-notifications-hq
import notifications.urls

#apps
from contact import urls
from careers import urls
# from issues import urls
# from projects import urls

urlpatterns = [
    path('admin/', admin.site.urls),

    #django-notifications-hq
    path('inbox/notifications/',include(notifications.urls,namespace='notifications')),
    
    #allauth urls
    path('accounts/', include('allauth.urls')),
    
    #ckeditor urls
    path('ckeditor/',include('ckeditor_uploader.urls')),
    
    #basic page urls
    path('navbar/',TemplateView.as_view(template_name='base.html'),name='nav'),
    path('',TemplateView.as_view(template_name='index.html'),name='homepage'),
    path('about/',TemplateView.as_view(template_name='about us.html'),name='aboutpage'),
    
    #solutions
    path('solutions/sap-hana/',TemplateView.as_view(template_name='Solutions-SAP HANA.html'),name='solutions-sap-hana'),
    path('solutions/sap-analytics/',TemplateView.as_view(template_name='Solutions-SAP Analytics.html'),name='solutions-sap-analytics'),
    path('solutions/sap-migration-services/',TemplateView.as_view(template_name='Solutions-SAP Migration Services.html'),name='solutions-sap-migrations'),
    path('solutions/sap-mobility/',TemplateView.as_view(template_name='Solutions-SAP Mobility.html'),name='solutions-sap-mobility'),
    
    #services
    path('services/sap-consulting/',TemplateView.as_view(template_name='Services-SAP Consulting.html'),name='services-sap-consulting'),
    path('services/corporate-training/',TemplateView.as_view(template_name='Services - Corporate Training.html'),name='services-corporate-training'),
    path('services/professional-services/',TemplateView.as_view(template_name='Services - Professional Services.html'),name='services-professional-services'),
    path('services/program-management/',TemplateView.as_view(template_name='Services - Program Management.html'),name='services-program-management'),
    path('services/center-of-excellence/',TemplateView.as_view(template_name='Services - Center of Excellence.html'),name='services-center-of-excellence'),
    
    #industries
    path('industry/discrete-manufacturing/',TemplateView.as_view(template_name='Industry - Discrete Manufacturing.html'),name='discrete-manufacturing'),
    path('industry/process-industry/',TemplateView.as_view(template_name='Industry - Process Industry.html'),name='process-industry'),
    
    #career
    path('career/',include('careers.urls')),    

    #contact
    path('contact/',include('contact.urls')),
    
        
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
