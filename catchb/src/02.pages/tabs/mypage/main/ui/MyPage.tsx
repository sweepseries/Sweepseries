import { ScrollView, View } from "react-native";
import * as Application from "expo-application";
import styled, { DefaultTheme } from "styled-components/native";

import { myPageStyles } from "./styles";
import {
  DeleteAccountButton,
  WithdrawSheetProvider,
} from "@features/auth/delete-account";
import { LogoutButton } from "@features/auth/logout";
import { PrivacyPolicyLink } from "@features/terms/read-privacy-policy";
import { TermsOfServiceLink } from "@features/terms/read-terms-of-service";
import { useAuth } from "@shared/lib/auth";
import { useColors } from "@shared/lib/colors";
import { Divider } from "@shared/ui/Dividers";

export function MyPageMain() {
  const { isAuthenticated } = useAuth();
  const { colors } = useColors();
  const styles = myPageStyles(colors);

  return (
    <WithdrawSheetProvider>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Subtitle>내 활동</Subtitle>
        <DividerWrapper>
          <Divider />
        </DividerWrapper>
        <Subtitle>이벤트 & 리워드</Subtitle>
        <DividerWrapper>
          <Divider />
        </DividerWrapper>
        <Subtitle>고객센터 및 설정</Subtitle>
        {isAuthenticated && (
          <>
            <DividerWrapper>
              <Divider />
            </DividerWrapper>
            <LogoutButton />
            <DeleteAccountButton />
          </>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <PrivacyPolicyLink />
        <TermsOfServiceLink />
        <Version>현재 버전 {Application.nativeApplicationVersion}</Version>
      </View>
    </WithdrawSheetProvider>
  );
}

const Subtitle = styled.Text`
  margin: 8px 0;
  font-size: 20px;
  font-weight: bold;
`;

const Version = styled.Text`
  flex: 1;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;

const DividerWrapper = styled.View`
  margin: 8px 0;
`;
