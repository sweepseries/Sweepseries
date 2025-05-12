from django.contrib import admin

## Models to unregister
from django.contrib.auth.models import Group
from allauth.account.models import EmailAddress
from allauth.socialaccount.models import SocialAccount, SocialToken, SocialApp
from rest_framework.authtoken.models import TokenProxy
from rest_framework_simplejwt.token_blacklist.models import (
    OutstandingToken,
    BlacklistedToken,
)

unnecessary_models = [
    Group,
    EmailAddress,
    SocialAccount,
    SocialToken,
    SocialApp,
    TokenProxy,
    OutstandingToken,
    BlacklistedToken,
]

for model in unnecessary_models:
    admin.site.unregister(model)
