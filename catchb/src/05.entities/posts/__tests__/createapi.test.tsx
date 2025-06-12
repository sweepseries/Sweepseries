import { Text, View } from "react-native";
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { samplePostDetail, useCreatePost } from "@entities/posts";
import { renderWithProviders } from "@test-utils/renderer";

const MockCreateComponent = ({
  withImageFiles,
}: {
  withImageFiles: boolean;
}) => {
  const { mutate, isSuccess } = useCreatePost();

  const sampleImageAsset = {
    uri: "https://placehold.co/400",
    width: 400,
    height: 300,
  };

  const handleCreate = () => {
    mutate({
      forum_id: 1,
      tag_id: 1,
      author_id: "1",
      title: "New Post",
      content: "This is a test post.",
      image_files: withImageFiles ? [sampleImageAsset] : [],
    });
  };

  return (
    <View>
      <Text onPress={handleCreate}>Create Post</Text>
      {isSuccess && <Text>Post Created</Text>}
    </View>
  );
};

describe("Posts Create API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should create a post without images", async () => {
    jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: samplePostDetail,
    });

    const { getByText } = renderWithProviders(
      <MockCreateComponent withImageFiles={false} />
    );

    fireEvent.press(getByText("Create Post"));

    await waitFor(() => {
      expect(getByText("Post Created")).toBeTruthy();
    });
  });

  it("should create a post with images", async () => {
    jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: samplePostDetail,
    });

    const { getByText } = renderWithProviders(
      <MockCreateComponent withImageFiles={true} />
    );

    fireEvent.press(getByText("Create Post"));

    await waitFor(() => {
      expect(getByText("Post Created")).toBeTruthy();
    });
  });
});
