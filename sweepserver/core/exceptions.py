from django.core.exceptions import (
    ObjectDoesNotExist,
    ValidationError as DjangoValidationError,
)
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import exception_handler


def get_drf_validation_error_response(e: ValidationError) -> Response:
    """
    DRF ValidationError를 처리하는 함수
    """
    if isinstance(e.detail, dict):
        return Response(data={"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)

    if isinstance(e.detail, list):
        return Response(data={"error": e.detail[0]}, status=status.HTTP_400_BAD_REQUEST)

    return Response(
        data={"error": "오류가 발생했습니다."}, status=status.HTTP_400_BAD_REQUEST
    )


def get_object_not_found_error_response(e: ObjectDoesNotExist) -> Response:
    """
    ObjectDoesNotExist를 처리하는 함수
    """
    return Response(data={"error": str(e)}, status=status.HTTP_404_NOT_FOUND)


def get_django_validation_error_response(e: DjangoValidationError) -> Response:
    """
    Django ValidationError를 처리하는 함수
    """
    return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


def custom_exception_handler(exc, context):
    """
    커스텀 예외 처리 함수
    """
    response = exception_handler(exc, context)

    print("exc", exc.__class__.__name__)

    if response is not None:
        if isinstance(exc, ValidationError):
            return get_drf_validation_error_response(exc)

        return response

    if isinstance(exc, ObjectDoesNotExist):
        return get_object_not_found_error_response(exc)

    if isinstance(exc, DjangoValidationError):
        return get_django_validation_error_response(exc)

    return Response(
        data={"error": "오류가 발생했습니다."},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )
