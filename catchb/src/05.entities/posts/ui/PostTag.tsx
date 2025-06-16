import { StyleSheet, Text, View } from "react-native";

import { CommunityTagType } from "@entities/community/@x/post";
import { ThemeColorType, useColors } from "@shared/lib/colors";
import { CommunityIcon } from "@shared/ui/Icons";

interface Props {
  tag: CommunityTagType;
}

/**
 * 게시글 목록에서, 게시글의 태그를 표시하는 컴포넌트.
 */

export function PostTag({ tag }: Readonly<Props>) {
  const { colors } = useColors();
  const styles = tagStyles(colors);

  return (
    <View style={styles.simple}>
      {tag.icon ? (
        <CommunityIcon icon={tag.name} height={20} />
      ) : (
        <Text style={styles.simpleText}>{tag.name}</Text>
      )}
    </View>
  );
}

const tagStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    simple: {
      paddingVertical: 4,
    },
    simpleText: {
      fontSize: 16,
      color: colors.highEmphasis,
    },
  });
