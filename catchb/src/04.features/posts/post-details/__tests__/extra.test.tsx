import { Text } from "react-native";

import { usePostDetails } from "../contexts/usePostDetails";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { isLoading } = usePostDetails();

  return <Text>{isLoading ? "Loading..." : "Loaded"}</Text>;
};

describe("usePostDetails", () => {
  it("should throw an error if used outside of PostDetailsProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "usePostDetails must be used within a PostDetailsProvider"
    );
  });
});
