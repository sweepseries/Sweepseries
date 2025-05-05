import { router } from "expo-router";
import styled from "styled-components/native";

import { logout } from "@entities/auth";
import { useAlert } from "@shared/lib/alert";
import { useAuth } from "@shared/lib/auth";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

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

  return (
    <Container onPress={requestLogout}>
      <AppIcon icon="logout" size={24} color={colors.lowEmphasis} />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 8px;
  border-radius: 4px;
`;
