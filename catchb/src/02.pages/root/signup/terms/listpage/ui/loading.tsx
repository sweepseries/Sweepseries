import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";

export function LoadingTermsList() {
  const { colors } = useColors();

  return (
    <Container>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item gap={8} height={240}>
          <SkeletonPlaceholder.Item width="50%" height={32} borderRadius={8} />
          <SkeletonPlaceholder.Item width="72%" height={24} borderRadius={8} />
          <SkeletonPlaceholder.Item
            width="100%"
            height={1}
            backgroundColor={colors.lowEmphasis}
            marginVertical={8}
          />
          <SkeletonPlaceholder.Item gap={16} height={132}>
            <SkeletonPlaceholder.Item
              width="100%"
              height={24}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={24}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={24}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={24}
              borderRadius={8}
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
