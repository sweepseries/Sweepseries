import styled from "styled-components/native";

import {
  LoadingPostDetails,
  PostDetailFooter,
  PostDetails,
  PostDetailsProvider,
  usePostDetails,
} from "@features/posts/post-details";

export function PostDetailsPage() {
  return (
    <PostDetailsProvider>
      <Components />
    </PostDetailsProvider>
  );
}

function Components() {
  const { isLoading } = usePostDetails();

  if (isLoading) {
    return (
      <Container>
        <LoadingPostDetails />
      </Container>
    );
  }

  return (
    <Container>
      <PostDetails />
      <PostDetailFooter />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
