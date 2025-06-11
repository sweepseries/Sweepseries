import styled, { DefaultTheme } from "styled-components/native";

import {
  CreatePostForm,
  CreatePostFormProvider,
  SubmitButton,
} from "@features/posts/create-post";

export function CreatePostPage() {
  return (
    <CreatePostFormProvider>
      <Container>
        <CreatePostForm />
        <SubmitButton />
      </Container>
    </CreatePostFormProvider>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 8px 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
