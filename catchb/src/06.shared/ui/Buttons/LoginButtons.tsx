import styled, { DefaultTheme } from "styled-components/native";

import KakaoIcon from "./kakao.svg";
import NaverIcon from "./naver.svg";

interface Props {
  type: "naver" | "kakao" | "catchb";
  onPress: () => void;
}

export function LoginButton({ type, onPress }: Readonly<Props>) {
  if (type === "naver") {
    return (
      <NaverContainer onPress={onPress}>
        <NaverIcon width={40} height={40} />
        <NaverText>네이버로 로그인</NaverText>
      </NaverContainer>
    );
  } else if (type === "kakao") {
    return (
      <KakaoContainer onPress={onPress}>
        <KakaoIcon width={40} height={40} />
        <KakaoText>카카오로 로그인</KakaoText>
      </KakaoContainer>
    );
  } else {
    return (
      <Container onPress={onPress}>
        <ButtonText>이메일로 로그인</ButtonText>
      </Container>
    );
  }
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.primary};
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  include-font-padding: false;
  color: white;
`;

const NaverContainer = styled(Container)`
  background-color: #03c75a;
`;

const NaverText = styled(ButtonText)`
  color: white;
`;

const KakaoContainer = styled(Container)`
  background-color: #fee500;
`;

const KakaoText = styled(ButtonText)`
  color: rgba(0, 0, 0, 0.85);
`;
