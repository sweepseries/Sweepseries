import { router } from "expo-router";

import { logout } from "../api/logout";
import { useAlert } from "@shared/lib/alert";
import { useAuth } from "@shared/lib/auth";
import { useColors } from "@shared/lib/colors";
import { NavigateButton } from "@shared/ui/Buttons";

export function LogoutButton() {
  const { showAlert } = useAlert();
  const { resetLoginStatus } = useAuth();
  const { colors } = useColors();

  const requestLogout = async () => {
    const isLoggedOut = await logout();
    if (isLoggedOut) {
      resetLoginStatus();

      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("/");
    } else {
      showAlert({
        title: "오류 발생",
        message: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
      });
    }
  };

  const onLogoutPress = () => {
    showAlert({
      title: "로그아웃",
      message: "정말 로그아웃 하시겠습니까?",
      onConfirm: requestLogout,
      enableCancel: true,
    });
  };

  return (
    <NavigateButton
      icon="logout"
      text="로그아웃"
      onPress={onLogoutPress}
      color={colors.lowEmphasis}
    />
  );
}
