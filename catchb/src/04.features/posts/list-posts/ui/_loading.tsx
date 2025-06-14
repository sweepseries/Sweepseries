import SkeletonPlaceholder from "react-native-skeleton-placeholder";

/**
 * 쿼리가 로딩중일 떄 표시할 컴포넌트.
 */

export function LoadingPostsList() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item gap={8}>
        <SkeletonPlaceholder.Item width="100%" gap={4}>
          <SkeletonPlaceholder.Item
            width="10%"
            height={16}
            borderRadius={4}
            marginVertical={8}
          />
          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            gap={8}
          >
            <SkeletonPlaceholder.Item flex={1} gap={4}>
              <SkeletonPlaceholder.Item
                width="100%"
                height={24}
                borderRadius={4}
                marginBottom={4}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={16}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={16}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width="40%"
                height={16}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={100}
              height={100}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width="10%"
            height={16}
            borderRadius={4}
            marginVertical={4}
          />
          <SkeletonPlaceholder.Item width="100%" height={28} borderRadius={4} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width="100%" height={1} />
        <SkeletonPlaceholder.Item width="100%" gap={4}>
          <SkeletonPlaceholder.Item
            width="10%"
            height={16}
            borderRadius={4}
            marginVertical={8}
          />
          <SkeletonPlaceholder.Item
            width="70%"
            height={24}
            borderRadius={4}
            marginBottom={4}
          />
          <SkeletonPlaceholder.Item width="100%" height={16} borderRadius={4} />
          <SkeletonPlaceholder.Item width="100%" height={16} borderRadius={4} />
          <SkeletonPlaceholder.Item width="40%" height={16} borderRadius={4} />
          <SkeletonPlaceholder.Item
            width="10%"
            height={16}
            borderRadius={4}
            marginVertical={4}
          />
          <SkeletonPlaceholder.Item width="100%" height={28} borderRadius={4} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width="100%" height={1} />
        <SkeletonPlaceholder.Item width="100%" gap={4}>
          <SkeletonPlaceholder.Item
            width="10%"
            height={16}
            borderRadius={4}
            marginVertical={8}
          />
          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            gap={8}
          >
            <SkeletonPlaceholder.Item flex={1} gap={4}>
              <SkeletonPlaceholder.Item
                width="100%"
                height={24}
                borderRadius={4}
                marginBottom={4}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={16}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={16}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width="40%"
                height={16}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={100}
              height={100}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width="10%"
            height={16}
            borderRadius={4}
            marginVertical={4}
          />
          <SkeletonPlaceholder.Item width="100%" height={28} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
