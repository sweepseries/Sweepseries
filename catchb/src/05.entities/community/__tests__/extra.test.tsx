import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { useCommunity } from "@entities/community";

const MockComponent = () => {
  const { activeProfile } = useCommunity();

  return (
    <>
      <Text>Active Profile: {activeProfile ? activeProfile.name : "None"}</Text>
    </>
  );
};

describe("CommunityProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<MockComponent />)).toThrow(
      "useCommunity must be used within a CommunityProvider"
    );
  });
});
