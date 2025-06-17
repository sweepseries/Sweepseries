import { RefreshControl, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { usePostList } from "../contexts/usePostList";
import { LoadingPostsList } from "./_loading";
import { PostSimple } from "@entities/posts";
import { Divider } from "@shared/ui/Dividers";
import { ErrorGuide } from "@shared/ui/Fallbacks";

export function PostsList() {
  const { posts, isLoading, isRefetching, refetch } = usePostList();

  const goToDetailPage = (postId: number) => {
    router.push(`/community/posts/${postId}`);
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingPostsList />
      </Container>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Container>
        <ErrorGuide message="게시글이 없습니다." />
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        testID="posts-list-scrollview"
      >
        <List>
          {posts.map((post) => (
            <View key={post.id}>
              <TouchableOpacity
                onPress={() => goToDetailPage(post.id)}
                testID={`post-${post.id}`}
              >
                <PostSimple post={post} />
              </TouchableOpacity>
              <Divider />
            </View>
          ))}
        </List>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

const List = styled.View`
  padding-bottom: 64px;
  gap: 4px;
`;
