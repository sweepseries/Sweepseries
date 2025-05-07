import { render } from "@testing-library/react-native";
import { SplashScreen } from "expo-router";

import { PermissionsProvider } from "../PermissionsProvider";

jest.mock("expo-router", () => ({
  SplashScreen: {
    hideAsync: jest.fn(),
  },
}));
jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
}));

describe("PermissionsProvider", () => {
  it("requests permissions on mount", () => {
    render(
      <PermissionsProvider>
        <></>
      </PermissionsProvider>
    );

    expect(SplashScreen.hideAsync).toHaveBeenCalled();
  });
});
