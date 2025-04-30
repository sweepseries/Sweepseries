import styled from "styled-components/native";

import NaverIcon from "./naver.svg";
import { LoginButtonContainer, LoginButtonText } from "@shared/ui/Buttons";

const NaverContainer = styled(LoginButtonContainer)`
  background-color: #03c75a;
`;

const NaverText = styled(LoginButtonText)`
  color: white;
`;

export function NaverLoginButton({ onPress }: { onPress: () => void }) {
  return (
    <NaverContainer onPress={onPress}>
      <NaverIcon width={40} height={40} />
      <NaverText>네이버로 로그인</NaverText>
    </NaverContainer>
  );
}
