import { PostListProvider, PostListTabs } from "@features/posts/list-posts";

export function CommunityMain() {
  return (
    <PostListProvider>
      <PostListTabs />
    </PostListProvider>
  );
}
