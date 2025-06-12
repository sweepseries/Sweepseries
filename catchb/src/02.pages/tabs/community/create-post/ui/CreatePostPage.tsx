import styled, { DefaultTheme } from "styled-components/native";

import {
  CreatePostForm,
  CreatePostFormProvider,
  ImageSelect,
  SubmitButton,
} from "@features/posts/create-post";
import { Divider } from "@shared/ui/Dividers";

export function CreatePostPage() {
  return (
    <CreatePostFormProvider>
      <Container>
        <CreatePostForm />
        <Divider />
        <ImageSelect />
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
