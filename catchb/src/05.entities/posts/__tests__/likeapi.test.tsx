import { Text, View } from "react-native";
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { samplePostDetail, useLikePost } from "@entities/posts";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

const MockLikeComponent = () => {
  const { mutate, isSuccess } = useLikePost(1, "1");

  const handleLike = () => {
    mutate();
  };

  return (
    <View>
      <Text onPress={handleLike}>Like Post</Text>
      {isSuccess && <Text>Post Liked</Text>}
    </View>
  );
};

describe("Posts Like API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should like a post (with existing cache -> not liked)", async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(["postDetails", 1, "1"], samplePostDetail);
    jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: { success: true },
    });

    const { getByText } = renderWithProviders(<MockLikeComponent />, {
      client: queryClient,
    });

    fireEvent.press(getByText("Like Post"));

    await waitFor(() => {
      expect(getByText("Post Liked")).toBeTruthy();
    });
  });

  it("should like a post (with existing cache -> liked)", async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(["postDetails", 1, "1"], {
      ...samplePostDetail,
      is_liked: true,
      num_likes: 6,
    });
    jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: { success: true },
    });

    const { getByText } = renderWithProviders(<MockLikeComponent />, {
      client: queryClient,
    });

    fireEvent.press(getByText("Like Post"));
  });

  it("should like a post (without existing cache)", async () => {
    const queryClient = createTestQueryClient();
    jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: { success: true },
    });

    const { getByText } = renderWithProviders(<MockLikeComponent />, {
      client: queryClient,
    });

    fireEvent.press(getByText("Like Post"));
  });
});
