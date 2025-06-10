import { Text, TouchableOpacity } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import {
  CommunityProvider,
  sampleCommunityProfiles,
  useCommunity,
} from "@entities/community";

const MockComponent = () => {
  const { activeProfile, switchProfile } = useCommunity();

  return (
    <>
      <Text>Active Profile: {activeProfile ? activeProfile.name : "None"}</Text>
      <TouchableOpacity
        onPress={() => switchProfile(sampleCommunityProfiles[0])}
        testID="switch-profile-button"
      />
    </>
  );
};

describe("CommunityProvider", () => {
  it("shoule throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<MockComponent />)).toThrow(
      "useCommunity must be used within a CommunityProvider"
    );
  });

  it("should render active profile when used within provider", () => {
    const { getByTestId, getByText } = render(
      <CommunityProvider>
        <MockComponent />
      </CommunityProvider>
    );

    expect(getByText("Active Profile: None")).toBeTruthy();

    fireEvent.press(getByTestId("switch-profile-button"));
  });
});
