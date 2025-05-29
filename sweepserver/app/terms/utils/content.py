from ..models import TermsAndConditions, TermsAndConditionsHistory


def has_content(term: TermsAndConditions) -> bool:
    """
    약관이 내용이 있는지 여부를 반환합니다.
        - 내용이 <p></p>일 경우에도 False를 반환합니다.
    """
    if not term.content:
        return False

    # 내용이 <p></p>인 경우에도 False를 반환
    if term.content.strip() == "<p></p>":
        return False

    return True


def has_content_version(version: TermsAndConditionsHistory) -> bool:
    """
    약관 버전이 내용이 있는지 여부를 반환합니다.
        - 내용이 <p></p>일 경우에도 False를 반환합니다.
    """
    if not version.content:
        return False

    # 내용이 <p></p>인 경우에도 False를 반환
    if version.content.strip() == "<p></p>":
        return False

    return True
