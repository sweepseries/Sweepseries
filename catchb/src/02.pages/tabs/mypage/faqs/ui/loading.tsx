import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styled, { DefaultTheme } from "styled-components/native";

export function LoadingFAQs() {
  return (
    <Container>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item gap={8}>
          <SkeletonPlaceholder.Item flexDirection="row" width={"100%"} gap={8}>
            <SkeletonPlaceholder.Item flex={1} height={36} borderRadius={4} />
            <SkeletonPlaceholder.Item flex={1} height={36} borderRadius={4} />
            <SkeletonPlaceholder.Item flex={1} height={36} borderRadius={4} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item flexDirection="row" width={"100%"} gap={8}>
            <SkeletonPlaceholder.Item flex={1} height={36} borderRadius={4} />
            <SkeletonPlaceholder.Item flex={1} height={36} borderRadius={4} />
            <SkeletonPlaceholder.Item flex={1} height={36} borderRadius={4} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width="100%" height={32} marginTop={16} borderRadius={8} />
          <SkeletonPlaceholder.Item
            width="100%"
            height={1}
            backgroundColor="#000000"
          />
          <SkeletonPlaceholder.Item width="100%" height={32} borderRadius={8} />
          <SkeletonPlaceholder.Item
            width="100%"
            height={1}
            backgroundColor="#000000"
          />
          <SkeletonPlaceholder.Item width="100%" height={32} borderRadius={8} />
          <SkeletonPlaceholder.Item
            width="100%"
            height={1}
            backgroundColor="#000000"
          />
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
