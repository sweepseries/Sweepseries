import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { useFAQList } from "../providers/FAQListProvider";

const TestComponent = () => {
  const { isLoading } = useFAQList();

  return <Text>{isLoading ? "Loading" : "Loaded"}</Text>;
};

describe("FAQListProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
