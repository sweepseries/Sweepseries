import { Text, TouchableOpacity } from "react-native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import {
  CommunityProfilesProvider,
  useCommunityProfiles,
} from "@entities/community-profiles";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { activeProfile, switchProfile, profiles } = useCommunityProfiles();

  return (
    <>
      <Text>{activeProfile ? "Loaded" : "Loading"}</Text>
      {profiles.map((profile) => (
        <TouchableOpacity
          key={profile.id}
          onPress={() => switchProfile(profile)}
        >
          <Text>{profile.name}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

describe("useCommunityProfiles", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useCommunityProfiles must be used within a CommunityProfileProvider"
    );
  });

  it("should not throw an error when used within provider", async () => {
    const { getByText } = renderWithProviders(
      <CommunityProfilesProvider>
        <TestComponent />
      </CommunityProfilesProvider>
    );

    await waitFor(() => {
      expect(getByText("Loaded")).toBeTruthy();
    });

    fireEvent.press(getByText("Profile One"));
  });
});
