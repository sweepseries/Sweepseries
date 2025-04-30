import * as Application from "expo-application";
import * as Linking from "expo-linking";
import styled, { DefaultTheme } from "styled-components/native";

export function MyPage() {
  const goToTermsOfService = () => {
    Linking.openURL("https://www.sweepseries.com/terms-of-service");
  };
  const goToPrivacyPolicy = () => {
    Linking.openURL("https://www.sweepseries.com/privacy-policy");
  };

  return (
    <>
      <Container showsVerticalScrollIndicator={false}></Container>
      <Footer>
        <LinkButton onPress={goToPrivacyPolicy}>
          <LinkText>개인정보 처리방침</LinkText>
        </LinkButton>
        <LinkButton onPress={goToTermsOfService}>
          <LinkText>이용약관</LinkText>
        </LinkButton>
        <LinkText>현재 버전 {Application.nativeApplicationVersion}</LinkText>
      </Footer>
    </>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`;

const LinkButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LinkText = styled.Text`
  flex: 1;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
