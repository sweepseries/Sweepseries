from django.apps import AppConfig

class CoreConfig(AppConfig):
    """
    관리자 페이지에서 필요없는 모듈을 제거하기 위한 설정
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        ## pylint: disable=C0415, W0611
        import core.admin
