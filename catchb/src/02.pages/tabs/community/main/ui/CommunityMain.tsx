import { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import PagerView, {
  PagerViewOnPageScrollEvent,
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";

import { communityMainStyles } from "./_styles";
import { CreatePostButton } from "@features/posts/create-post";
import {
  PostListProvider,
  PostListTabs,
  PostsList,
  SearchPosts,
  TagFilter,
} from "@features/posts/list-posts";
import { useCommunity } from "@entities/community";
import { Divider } from "@shared/ui/Dividers";

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
    const activeIndex = forums.findIndex(
      (forum) => forum.id === activeForum.id
    );
    ref.current?.setPage(activeIndex);
  }, [activeForum, forums]);

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
          <PostListProvider forum={forum} key={forum.id}>
            <SearchPosts />
            <TagFilter />
            <Divider />
            <PostsList />
          </PostListProvider>
        ))}
      </PagerView>
      <CreatePostButton />
    </View>
  );
}
