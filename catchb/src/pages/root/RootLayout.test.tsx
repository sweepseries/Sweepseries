import { waitFor } from "@testing-library/react-native";

import { RootLayout } from "./RootLayout";
import * as InitializerApi from "@services/app/initialize";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@react-native-kakao/core", () => ({
  initializeKakaoSDK: jest.fn(),
}));
jest.mock("@react-native-seoul/naver-login", () => ({
  initialize: jest.fn(),
}));

describe("<RootLayout />", () => {
  it("initializes correctly", () => {
    jest.spyOn(InitializerApi, "initialize").mockResolvedValue({
      KAKAO_APP_KEY: "test-kakao-app-key",
      NAVER_CONSUMER_KEY: "test-naver-consumer-key",
      NAVER_CONSUMER_SECRET: "test-naver-consumer-secret",
    });

    waitFor(() => renderWithProviders(<RootLayout />));
  });

  it("initialize fail", () => {
    jest.spyOn(InitializerApi, "initialize").mockResolvedValue(null);

    renderWithProviders(<RootLayout />);
  });
});
