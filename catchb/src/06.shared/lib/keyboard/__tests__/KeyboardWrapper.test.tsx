import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { KeyboardWrapper } from "@shared/lib/keyboard";
import { renderWithProviders } from "@test-utils/renderer";

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useSafeAreaInsets: jest.fn(() => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })),
}));

describe("KeyboardWrapper", () => {
  it("renders children correctly", () => {
    const { getByText } = renderWithProviders(
      <SafeAreaProvider>
        <KeyboardWrapper>
          <Text>Test Child</Text>
        </KeyboardWrapper>
      </SafeAreaProvider>
    );

    expect(getByText("Test Child")).toBeTruthy();
  });
});
