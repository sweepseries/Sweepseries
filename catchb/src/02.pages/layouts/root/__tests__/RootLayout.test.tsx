import { RootLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

jest.mock("react-native-gesture-handler", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return {
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => (
      <TouchableOpacity>{children}</TouchableOpacity>
    ),
  };
});

describe("RootLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<RootLayout />);
  });
});
