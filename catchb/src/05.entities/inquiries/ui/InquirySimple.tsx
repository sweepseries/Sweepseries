import { View } from "react-native";
import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { InquiryThreadType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { Divider } from "@shared/ui/Dividers";

interface Props {
  inquiry: InquiryThreadType;
}

export function InquirySimple({ inquiry }: Readonly<Props>) {
  const { colors } = useColors();

  const goToDetailPage = () => {
    router.push(`/mypage/inquiries/${inquiry.id}`);
  };

  const getStatusTextColor = () => {
    switch (inquiry.status) {
      case "신규":
        return colors.primary;
      case "진행중":
        return colors.mediumEmphasis;
      default:
        return colors.lowEmphasis;
    }
  };

  return (
    <View>
      <Wrapper onPress={goToDetailPage} testID={`inquiry-${inquiry.id}`}>
        {inquiry.is_updated && <RedDot />}
        <Title>
          [{inquiry.category}] {inquiry.title}
        </Title>
        <Status style={{ color: getStatusTextColor() }}>
          {inquiry.status}
        </Status>
      </Wrapper>
      <Divider />
    </View>
  );
}

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
`;

const RedDot = styled.View`
  position: absolute;
  top: 10px;
  right: 18px;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: #ff0000;
`;

const Title = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: "tail",
})`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const Status = styled.Text`
  font-size: 12px;
`;
