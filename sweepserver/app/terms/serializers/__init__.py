from .admin_serializers import (
    TermsAndConditionsSimpleSerializerForAdmin,
    TermsAndConditionsDetailSerializerForAdmin,
)
from .base_serializers import (
    TermsAndConditionsSerializer,
    TermsAndConditionsVersionSerializer,
)

__all__ = [
    "TermsAndConditionsSimpleSerializerForAdmin",
    "TermsAndConditionsDetailSerializerForAdmin",
    "TermsAndConditionsSerializer",
    "TermsAndConditionsVersionSerializer",
]
