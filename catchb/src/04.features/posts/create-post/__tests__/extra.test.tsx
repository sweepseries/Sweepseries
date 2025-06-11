import { Text } from "react-native";

import { useCreatePostForm } from "../contexts/useCreatePostForm";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { title } = useCreatePostForm();

  return <Text testID="title-text">{title}</Text>;
};

describe("useCreatePostForm", () => {
  it("should throw an error if used outside of CreatePostProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useCreatePostForm must be used within a CreatePostProvider"
    );
  });
});
