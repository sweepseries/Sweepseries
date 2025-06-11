import { useEffect, useRef } from "react";
import { Animated, Dimensions, Text, View } from "react-native";
import PagerView, {
  PagerViewOnPageScrollEvent,
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";

import { communityMainStyles } from "./_styles";
import { PostListTabs } from "@features/posts/list-posts";
import { useCommunity } from "@entities/community";

const { width: screenWidth } = Dimensions.get("window");

export function CommunityMain() {
  const { forums, activeForum, setActiveForum } = useCommunity();
  const ref = useRef<PagerView>(null);
  const translateX = useRef(new Animated.Value(0)).current;
  const tabWidth = screenWidth / forums.length;

  const onPageScroll = (event: PagerViewOnPageScrollEvent) => {
    const { position, offset } = event.nativeEvent;
    translateX.setValue((position + offset) * tabWidth);
  };

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    setActiveForum(forums[event.nativeEvent.position]);
  };

  useEffect(() => {
    if (!activeForum) return;

    const activeIndex = forums.findIndex(
      (forum) => forum.id === activeForum.id
    );
    ref.current?.setPage(activeIndex);
  }, [activeForum, forums]);

  if (!activeForum) return null;

  return (
    <View style={communityMainStyles.flex}>
      <PostListTabs translateX={translateX} />
      <PagerView
        style={communityMainStyles.flex}
        initialPage={activeForum.id - 1}
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}
        ref={ref}
        testID="community-pager-view"
      >
        {forums.map((forum) => (
          <View
            key={forum.id}
            style={communityMainStyles.flex}
            testID={`community-forum-${forum.name}`}
          >
            <Text style={{ fontSize: 24 }}>{forum.name}</Text>
            {/* Here you can render the posts for the forum */}
          </View>
        ))}
      </PagerView>
    </View>
  );
}
