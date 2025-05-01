import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export function LoadingTerms() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item width="auto" height={40} borderRadius={8} />
    </SkeletonPlaceholder>
  );
}
