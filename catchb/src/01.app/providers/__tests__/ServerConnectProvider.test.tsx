import { Text } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import * as Network from "expo-network";
import axios from "axios";

import { ServerConnectProvider } from "../server/ServerConnectProvider";

jest.mock("@react-native-kakao/core", () => ({
  initializeKakaoSDK: jest.fn(),
}));
jest.mock("@react-native-seoul/naver-login", () => ({
  initialize: jest.fn(),
}));

describe("ServerConnectProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Network, "getNetworkStateAsync").mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
      type: Network.NetworkStateType.WIFI,
    });
    jest.spyOn(axios, "get").mockResolvedValue({
      status: 200,
      data: {
        KAKAO_APP_KEY: "test-kakao-key",
        NAVER_CONSUMER_KEY: "test-naver-key",
        NAVER_CONSUMER_SECRET: "test-naver-secret",
      },
    });
  });

  it("handles all connections successful", async () => {
    const { getByText } = render(
      <ServerConnectProvider>
        <Text>Online</Text>
      </ServerConnectProvider>
    );

    await waitFor(() => {
      expect(getByText("Online")).toBeTruthy();
    });
  });

  it("handles no network connection", async () => {
    jest.spyOn(Network, "getNetworkStateAsync").mockResolvedValue({
      isConnected: false,
      isInternetReachable: false,
      type: Network.NetworkStateType.NONE,
    });

    const { queryByText } = render(
      <ServerConnectProvider>
        <Text>Offline</Text>
      </ServerConnectProvider>
    );

    await waitFor(() => {
      expect(queryByText("Offline")).toBeNull();
    });
  });

  it("handles server bad response", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ status: 400 });

    const { queryByText } = render(
      <ServerConnectProvider>
        <Text>Offline</Text>
      </ServerConnectProvider>
    );

    await waitFor(() => {
      expect(queryByText("Offline")).toBeNull();
    });
  });

  it("handles server connection fail", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Server error"));

    const { queryByText } = render(
      <ServerConnectProvider>
        <Text>Offline</Text>
      </ServerConnectProvider>
    );

    await waitFor(() => {
      expect(queryByText("Offline")).toBeNull();
    });
  });
});
