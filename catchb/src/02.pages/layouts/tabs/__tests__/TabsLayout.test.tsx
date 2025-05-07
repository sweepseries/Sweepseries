import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

import { TabsLayout } from "@pages/layouts/";
import * as AuthContext from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

jest.mock("expo-router", () => {
  const { View } = jest.requireActual("react-native");

  return {
    Tabs: Object.assign(
      ({ children }: { children: React.ReactNode }) => children,
      {
        Screen: ({ options }: { options?: BottomTabNavigationOptions }) => (
          <View>
            {options?.tabBarIcon &&
              options.tabBarIcon({ focused: true, color: "", size: 0 })}
          </View>
        ),
      }
    ),
  };
});

describe("TabsLayout", () => {
  it("renders correctly in guest mode", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      mode: "GUEST",
      user: null,
      isAuthenticated: false,
      saveLoginStatus: jest.fn(),
      resetLoginStatus: jest.fn(),
    });

    renderWithProviders(<TabsLayout />);
  });

  it("renders correctly in normal mode", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      mode: "NORMAL",
      user: AuthContext.sampleUserProfile,
      isAuthenticated: true,
      saveLoginStatus: jest.fn(),
      resetLoginStatus: jest.fn(),
    });

    renderWithProviders(<TabsLayout />);
  });

  it("renders correctly in pro mode", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      mode: "PRO",
      user: AuthContext.sampleUserProfile,
      isAuthenticated: true,
      saveLoginStatus: jest.fn(),
      resetLoginStatus: jest.fn(),
    });

    renderWithProviders(<TabsLayout />);
  });
});
