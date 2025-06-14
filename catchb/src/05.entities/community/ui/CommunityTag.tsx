import { StyleSheet, Text, View } from "react-native";

import { CommunityTagType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { CommunityIcon } from "@shared/ui/Icons";

interface Props {
  tag: CommunityTagType;
  active?: boolean;
}

/**
 * CommunityChipTag: 게시글 목록에서 필터로 사용되는 태그 컴포넌트.
 */

export function CommunityChipTag({ tag, active = false }: Readonly<Props>) {
  const { colors } = useColors();

  if (tag.icon) {
    return (
      <View
        style={[
          styles.iconTag,
          { backgroundColor: active ? colors.primary : "transparent" },
        ]}
      >
        <CommunityIcon icon={tag.name} height={28} width={28} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.textTag,
        { backgroundColor: active ? colors.primary : "transparent" },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: active ? colors.background : colors.highEmphasis },
        ]}
      >
        {tag.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  textTag: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
