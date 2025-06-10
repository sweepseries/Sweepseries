import { Linking, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import styled, { DefaultTheme } from "styled-components/native";

import { useInquiryForm } from "../providers/InquiryFormProvider";
import { useAlert } from "@shared/lib/alert";
import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

export function InquiryGuide() {
  const { showAlert } = useAlert();
  const { colors } = useColors();
  const { openForm, isOpen } = useInquiryForm();

  const sendEmail = async () => {
    Linking.openURL("mailto:support@sweepseries.com");
  };

  const copyEmailAddress = async () => {
    await Clipboard.setStringAsync("support@sweepseries.com");

    showAlert({
      title: "복사 완료",
      message: "이메일 주소가 복사되었습니다.",
    });
  };

  const guideText =
    "Catch B 서비스 이용 시 불편사항이나 문의사항을 보내주시면 신속하고 친절하게 안내해 드리겠습니다.\n\n빠른 처리를 원하시는 경우, 대표 이메일로 문의 부탁드립니다.\n\n사용환경 및 상세사항을 적어주시면 정확하고 빠른 답변이 가능하며, 메일을 보내시기 전 이름, 이메일, 질문유형이 정확한지 다시 한 번 확인해주세요!";

  return (
    <Container>
      <EmailContainer>
        <AppIcon icon="envelope" size={28} color={colors.primary} />
        <TouchableOpacity onPress={sendEmail} testID="email">
          <EmailText>support@sweepseries.com</EmailText>
        </TouchableOpacity>
        <TouchableOpacity onPress={copyEmailAddress} testID="copy">
          <AppIcon icon="copy" size={24} color={colors.lowEmphasis} />
        </TouchableOpacity>
      </EmailContainer>
      <GuideText testID="guide-text">{guideText}</GuideText>
      {!isOpen ? <TextButton text="1:1 문의하기" onPress={openForm} /> : null}
    </Container>
  );
}

const Container = styled.View`
  padding: 16px 24px;
  gap: 24px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.backgroundGray};
`;

const EmailContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const EmailText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const GuideText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
`;
