from django.conf.urls import patterns, include, url
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.views.generic import TemplateView
from chat.views import SimpleMessageChat
admin.autodiscover()

urlpatterns = patterns('',
    # admin page
    url(r'^$', TemplateView.as_view(template_name='chat/home.html')),
    url(r'^messages/$', SimpleMessageChat.as_view(), name="message_backend"),
    url(r'^admin/', include(admin.site.urls))
)
