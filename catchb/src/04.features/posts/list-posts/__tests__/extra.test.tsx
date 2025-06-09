import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { usePostLists } from "../hooks/usePostLists";

const TestComponent = () => {
  const { isLoading } = usePostLists();

  return <Text>{isLoading ? "Loading..." : "Loaded"}</Text>;
};

describe("usePostLists", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "usePostLists must be used within a PostListProvider"
    );
  });
});
