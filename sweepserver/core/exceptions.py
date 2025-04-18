from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response


def get_drf_validation_error_response(e: ValidationError) -> Response:
    """
    DRF ValidationError를 처리하는 함수
    """
    if isinstance(e.detail, dict):
        return Response(
            data={"error": e.detail},
            status=400,
        )
    else:
        return Response(
            data={"error": str(e)},
            status=400,
        )


def get_object_not_found_error_response(e: ObjectDoesNotExist) -> Response:
    """
    ObjectDoesNotExist를 처리하는 함수
    """
    return Response(
        data={"error": str(e)},
        status=404,
    )
