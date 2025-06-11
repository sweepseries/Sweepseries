import { Text, TouchableOpacity } from "react-native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import axios from "axios";

import {
  CommunityProvider,
  sampleCommunityInitializerResponse,
  sampleCommunityProfiles,
  useCommunity,
} from "@entities/community";
import * as AlertAPI from "@shared/lib/alert";
import * as StorageAPI from "@shared/lib/storage";

jest.unmock("@entities/community/api/initialize");

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
  beforeEach(() => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: sampleCommunityInitializerResponse,
    });
    jest.spyOn(StorageAPI, "getStorage").mockResolvedValue("1");
  });

  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<MockComponent />)).toThrow(
      "useCommunity must be used within a CommunityProvider"
    );
  });

  it("should render active profile when used within provider", async () => {
    const { getByTestId, getByText } = render(
      <CommunityProvider>
        <MockComponent />
      </CommunityProvider>
    );

    await waitFor(() => {
      expect(getByText("Active Profile: None")).toBeTruthy();
    });

    fireEvent.press(getByTestId("switch-profile-button"));
  });

  it("should render with no saved initial profile id and no forums", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: { ...sampleCommunityInitializerResponse, forums: [] },
    });
    jest.spyOn(StorageAPI, "getStorage").mockResolvedValue(null);

    const { getByText } = render(
      <CommunityProvider>
        <MockComponent />
      </CommunityProvider>
    );

    await waitFor(() => {
      expect(getByText("Active Profile: None")).toBeTruthy();
    });
  });

  it("should handle api error", async () => {
    const showAlertMock = jest.fn();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    jest.spyOn(axios, "get").mockRejectedValue(new Error("API Error"));

    render(
      <CommunityProvider>
        <MockComponent />
      </CommunityProvider>
    );

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "커뮤니티 데이터 로드 실패",
          message:
            "커뮤니티 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.",
        })
      );
    });
  });
});
