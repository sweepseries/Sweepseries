import { TouchableOpacity } from "react-native";
import { render } from "@testing-library/react-native";

import { useSwitchProfile } from "../hooks/useSwitchProfile";

const TestComponent = () => {
  const { toggleSheet } = useSwitchProfile();

  return <TouchableOpacity onPress={toggleSheet} testID="toggle-button" />;
};

describe("useSwitchProfile", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useSwitchProfile must be used within a SwitchProfileProvider"
    );
  });
});
