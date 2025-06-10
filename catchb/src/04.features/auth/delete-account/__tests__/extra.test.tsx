import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { useWithdrawSheet } from "../providers/WithdrawSheetProvider";

const TestComponent = () => {
  const { openSheet } = useWithdrawSheet();

  return <Text onPress={openSheet}>Open Sheet</Text>;
};

describe("WithdrawSheetProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
