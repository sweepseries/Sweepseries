import { Text, View } from "react-native";
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { useDeletePost } from "@entities/posts";
import { renderWithProviders } from "@test-utils/renderer";

const MockDeleteComponent = () => {
  const { mutate, isSuccess } = useDeletePost(1, "1");

  const handleDelete = () => {
    mutate();
  };

  return (
    <View>
      <Text onPress={handleDelete}>Delete Post</Text>
      {isSuccess && <Text>Post Deleted</Text>}
    </View>
  );
};

describe("Posts Delete API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should delete a post (with existing cache)", async () => {
    jest.spyOn(axios, "delete").mockResolvedValueOnce({
      data: { success: true },
    });

    const { getByText } = renderWithProviders(<MockDeleteComponent />);

    fireEvent.press(getByText("Delete Post"));

    await waitFor(() => {
      expect(getByText("Post Deleted")).toBeTruthy();
    });
  });
});
