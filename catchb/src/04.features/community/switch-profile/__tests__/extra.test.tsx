import { TouchableOpacity } from "react-native";
import { render } from "@testing-library/react-native";

import { useSwitchCommunityProfile } from "../hooks/useSwitchCommunityProfile";

const TestComponent = () => {
  const { openSheet } = useSwitchCommunityProfile();

  return <TouchableOpacity onPress={openSheet} testID="open-sheet-button" />;
};

describe("useSwitchCommunityProfile", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useSwitchCommunityProfile must be used within a SwitchCommunityProfileProvider"
    );
  });
});
