from ..models import TermsAndConditions


def get_latest_version_id(obj: TermsAndConditions) -> int:
    """
    약관의 최신 버전 ID를 반환합니다.
    """
    latest_version = obj.history.order_by("-created_at").first()

    return latest_version.id if latest_version else None
