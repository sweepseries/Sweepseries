import { Platform } from "react-native";

import { MyPageLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("MyPageLayout", () => {
  const realPlatform = Platform.OS;

  afterEach(() => {
    jest.restoreAllMocks();
    Object.defineProperty(Platform, "OS", { value: realPlatform });
  });

  it("renders correctly in ios", () => {
    Object.defineProperty(Platform, "OS", { value: "ios" });

    renderWithProviders(<MyPageLayout />);
  });

  it("renders correctly in android", () => {
    Object.defineProperty(Platform, "OS", { value: "android" });

    renderWithProviders(<MyPageLayout />);
  });
});
