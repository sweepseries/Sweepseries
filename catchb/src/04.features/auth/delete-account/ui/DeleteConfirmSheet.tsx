import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";

interface Props {
  closeSheet: () => void;
}

export function DeleteConfirmSheet({ closeSheet }: Readonly<Props>) {
  const { colors } = useColors();

  const goToWithdrawPage = () => {
    router.push("/mypage/withdraw");
    closeSheet();
  };

  return (
    <BottomSheetView style={styles.container}>
      <Subtitle>회원탈퇴</Subtitle>
      <TextBlock>
        <Text>
          {
            " \u2022 회원 탈퇴 시, 즉시 탈퇴 처리가 되며 향후 재가입은 가능합니다."
          }
        </Text>
        <Text>
          {
            " \u2022 탈퇴 후에는 개인정보와 포인트가 삭제되며 복구가 불가합니다."
          }
        </Text>
        <Text>
          {
            " \u2022 포인트 사용 어뷰징을 막기 위한 최소한의 기록을 보관하며 위반시 제재가 들어갑니다."
          }
        </Text>
      </TextBlock>
      <Wrapper>
        <ButtonWrapper>
          <TextButton
            text="돌아가기"
            onPress={closeSheet}
            color={colors.lowEmphasis}
            backgroundColor={colors.border}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <TextButton text="탈퇴하기" onPress={goToWithdrawPage} />
        </ButtonWrapper>
      </Wrapper>
    </BottomSheetView>
  );
}

const Subtitle = styled.Text`
  margin: 8px 0;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const TextBlock = styled.View`
  gap: 4px;
`;

const Text = styled.Text`
  line-height: 20px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ButtonWrapper = styled.View`
  flex: 1;
  margin-top: 8px;
`;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
});
