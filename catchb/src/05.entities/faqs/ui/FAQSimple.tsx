import styled, { DefaultTheme } from "styled-components/native";

import { FAQType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";
import { Divider } from "@shared/ui/Dividers";

interface Props {
  faq: FAQType;
  expanded: boolean;
  onPress: () => void;
}

export function FAQSimple({ faq, expanded, onPress }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      <TitleWrapper onPress={onPress}>
        <Title>
          [{faq.category}] {faq.question}
        </Title>
        <AppIcon
          icon={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.lowEmphasis}
        />
      </TitleWrapper>
      {expanded && <Description>{faq.answer}</Description>}
      <Divider />
    </Container>
  );
}

const Container = styled.View`
  gap: 12px;
`;

const TitleWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const Title = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const Description = styled.Text`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;
