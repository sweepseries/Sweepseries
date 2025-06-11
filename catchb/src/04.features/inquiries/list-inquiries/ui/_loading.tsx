import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export function LoadingInquiries() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item gap={4} height={112}>
        <SkeletonPlaceholder.Item width="100%" height={32} borderRadius={8} />
        <SkeletonPlaceholder.Item
          width="100%"
          height={1}
          backgroundColor="#e0e0e0"
        />
        <SkeletonPlaceholder.Item width="100%" height={32} borderRadius={8} />
        <SkeletonPlaceholder.Item
          width="100%"
          height={1}
          backgroundColor="#e0e0e0"
        />
        <SkeletonPlaceholder.Item width="100%" height={32} borderRadius={8} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
