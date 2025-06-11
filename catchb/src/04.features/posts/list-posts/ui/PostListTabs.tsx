import { useEffect } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CommunityForumType, useCommunity } from "@entities/community";
import { ThemeColorType, useColors } from "@shared/lib/colors";

const { width: screenWidth } = Dimensions.get("window");

interface Props {
  translateX: Animated.Value;
}

export function PostListTabs({ translateX }: Readonly<Props>) {
  const { forums, activeForum, setActiveForum } = useCommunity();
  const { colors } = useColors();
  const styles = tabsStyles(colors);

  const tabWidth = screenWidth / forums.length;

  const handleTabPress = (forum: CommunityForumType) => {
    setActiveForum(forum);
  };

  useEffect(() => {
    if (!activeForum) return;

    Animated.spring(translateX, {
      toValue: (activeForum.id - 1) * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeForum, tabWidth]);

  if (!activeForum) return null;

  return (
    <View style={styles.container}>
      {forums.map((forum) => (
        <TouchableOpacity
          key={forum.id}
          style={styles.tab}
          onPress={() => handleTabPress(forum)}
          testID={`community-tab-${forum.name}`}
        >
          <Text
            style={[
              styles.tabText,
              activeForum.id === forum.id && styles.activeTabText,
            ]}
            testID={`community-tab-text-${forum.name}`}
          >
            {forum.name}
          </Text>
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[
          styles.indicator,
          { width: tabWidth, transform: [{ translateX }] },
        ]}
      />
    </View>
  );
}

const tabsStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      shadowColor: colors.lowEmphasis,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: colors.background,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
    },
    tabText: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.lowEmphasis,
    },
    activeTabText: {
      color: colors.primary,
    },
    indicator: {
      height: 3,
      backgroundColor: colors.primary,
      position: "absolute",
      bottom: 0,
      left: 0,
    },
  });
