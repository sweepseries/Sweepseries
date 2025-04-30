import styled from "styled-components/native";

import { CatchBMainLogo } from "@shared/ui/Logo";

const Header = styled.View`
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const HeaderText = styled.Text`
  text-align: center;
  font-size: 20px;
  line-height: 28px;
  include-font-padding: false;
`;

export function AuthHeader() {
  return (
    <Header>
      <CatchBMainLogo />
      <HeaderText>
        {"지금 로그인하고\nCatch B에서 야구를 즐겨보세요!"}
      </HeaderText>
    </Header>
  );
}
