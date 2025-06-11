import { Text } from "react-native";

import { usePostList } from "../contexts/usePostList";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { isLoading } = usePostList();

  return <Text>{isLoading ? "Loading..." : "Loaded"}</Text>;
};

describe("usePostList", () => {
  it("should throw an error if used outside of PostsListProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "usePostList must be used within a PostsListProvider"
    );
  });
});
