import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styled, { DefaultTheme } from "styled-components/native";

export function LoadingAnnouncements() {
  return (
    <Container>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item gap={8} height={112}>
          <SkeletonPlaceholder.Item width="100%" height={32} borderRadius={8} />
          <SkeletonPlaceholder.Item width="100%" height={32} borderRadius={8} />
          <SkeletonPlaceholder.Item width="100%" height={32} borderRadius={8} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 8px 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
