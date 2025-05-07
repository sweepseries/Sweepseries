import { AppState, AppStateStatus, Platform } from "react-native";
import { render } from "@testing-library/react-native";
import { focusManager } from "@tanstack/react-query";
import * as Network from "expo-network";

import { QueryProvider } from "../QueryProvider";

describe("QueryProvider", () => {
  const realPlatform = Platform.OS;
  const spy = jest.spyOn(focusManager, "setFocused");

  beforeEach(() => {
    jest
      .spyOn(AppState, "addEventListener")
      .mockImplementation(
        (event: string, cb: (status: AppStateStatus) => void) => {
          // Simulate the app going to the background and then coming back to the foreground
          cb("background" as AppStateStatus);
          cb("active" as AppStateStatus);
          return { remove: jest.fn() };
        }
      );
    jest.spyOn(Network, "addNetworkStateListener").mockImplementation((cb) => {
      // simulate both connected & disconnected states
      cb({ isConnected: true });
      cb({ isConnected: false });
      return { remove: jest.fn() };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spy.mockReset();
    Object.defineProperty(Platform, "OS", { value: realPlatform });
  });

  it("should subscribe to app state in mobile device", () => {
    Object.defineProperty(Platform, "OS", { value: "ios" });

    render(
      <QueryProvider>
        <></>
      </QueryProvider>
    );
  });

  it("should subscribe to app state in web", () => {
    Object.defineProperty(Platform, "OS", { value: "web" });

    render(
      <QueryProvider>
        <></>
      </QueryProvider>
    );
  });
});
