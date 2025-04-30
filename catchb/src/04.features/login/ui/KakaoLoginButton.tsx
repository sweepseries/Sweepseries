import styled from "styled-components/native";

import KakaoIcon from "./kakao.svg";
import { LoginButtonContainer, LoginButtonText } from "@shared/ui/Buttons";

const KakaoContainer = styled(LoginButtonContainer)`
  background-color: #fee500;
`;

const KakaoText = styled(LoginButtonText)`
  color: rgba(0, 0, 0, 0.85);
`;

export function KakaoLoginButton({ onPress }: { onPress: () => void }) {
  return (
    <KakaoContainer onPress={onPress}>
      <KakaoIcon width={40} height={40} />
      <KakaoText>카카오로 로그인</KakaoText>
    </KakaoContainer>
  );
}
