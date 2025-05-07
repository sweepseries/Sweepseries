import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";

export function LoadingTermDetails() {
  const { colors } = useColors();

  return (
    <Container>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item gap={8} height={240}>
          <SkeletonPlaceholder.Item height={24} width="60%" borderRadius={8} />
          <SkeletonPlaceholder.Item
            width="100%"
            height={1}
            backgroundColor={colors.lowEmphasis}
            marginVertical={8}
          />
          <SkeletonPlaceholder.Item gap={8} height={80}>
            <SkeletonPlaceholder.Item
              width="100%"
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width="40%"
              height={20}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 24px 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
