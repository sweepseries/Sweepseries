import { render } from "@testing-library/react-native";

import { App } from "../App";

jest.mock("expo-router", () => ({
  SplashScreen: {
    preventAutoHideAsync: jest.fn(),
  },
}));
jest.mock("../providers", () => ({
  AlertProvider: ({ children }: { children: React.ReactNode }) => children,
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  AutoLoginProvider: ({ children }: { children: React.ReactNode }) => children,
  PermissionsProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  QueryProvider: ({ children }: { children: React.ReactNode }) => children,
  ServerConnectProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock("@pages/layouts", () => ({
  RootLayout: () => <></>,
}));

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);
  });
});
