import { View } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { InquiryThreadType } from "../models/types";
import { Divider } from "@shared/ui/Dividers";

interface Props {
  inquiry: InquiryThreadType;
}

export function InquirySimple({ inquiry }: Readonly<Props>) {
  return (
    <View>
      <Wrapper>
        <Title>
          [{inquiry.category}] {inquiry.title}
        </Title>
        <Status>{inquiry.status}</Status>
      </Wrapper>
      <Divider />
    </View>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const Status = styled.Text`
  font-size: 12px;
`;
