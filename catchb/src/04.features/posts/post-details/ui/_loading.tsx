import SkeletonPlaceholder from "react-native-skeleton-placeholder";

/**
 *  쿼리가 로딩중일 때 표시할 게시글 상세 컴포넌트.
 */

export function LoadingPostDetails() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item gap={8}>
        <SkeletonPlaceholder.Item width="10%" height={20} borderRadius={8} />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          gap={8}
        >
          <SkeletonPlaceholder.Item width={24} height={24} borderRadius={12} />
          <SkeletonPlaceholder.Item width={64} height={24} borderRadius={8} />
          <SkeletonPlaceholder.Item width={36} height={20} borderRadius={4} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width="60%" height={28} borderRadius={4} />
        <SkeletonPlaceholder.Item width="100%" height={16} borderRadius={4} />
        <SkeletonPlaceholder.Item width="100%" height={16} borderRadius={4} />
        <SkeletonPlaceholder.Item width="40%" height={16} borderRadius={4} />
        <SkeletonPlaceholder.Item width="100%" height={200} borderRadius={4} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
