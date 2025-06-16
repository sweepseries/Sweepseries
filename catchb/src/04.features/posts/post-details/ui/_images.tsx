import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";

import { PostImageType } from "@entities/posts";

interface Props {
  images: PostImageType[];
}

/**
 * 게시글 상세 페이지에서 이미지들을 가로로 스크롤할 수 있는 컴포넌트.
 */

export function PostImages({ images }: Readonly<Props>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      contentContainerStyle={styles.images}
    >
      {images.map((image) => (
        <View key={image.id} style={styles.container}>
          <Image
            source={{ uri: image.image }}
            style={styles.image}
            contentFit="cover"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    marginTop: 16,
  },
  images: {
    gap: 8,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
});
