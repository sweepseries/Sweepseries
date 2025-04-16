/* eslint-disable @typescript-eslint/no-explicit-any */
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

jest.mock("expo-router", () => {
  const { Text, TouchableOpacity, View } = jest.requireActual("react-native");

  const MockTopTabs = ({ children }: { children: React.ReactNode }) => children;
  const MockTopTabsScreen = ({
    name,
    listeners,
  }: {
    name: string;
    listeners: any;
  }) => (
    <TouchableOpacity onPress={listeners.tabPress} testID={`tab-${name}`} />
  );

  MockTopTabs.Screen = MockTopTabsScreen;

  return {
    Stack: Object.assign(
      ({
        children,
        screenOptions,
      }: {
        children: React.ReactNode;
        screenOptions: NativeStackNavigationOptions;
      }) => (
        <View>
          {screenOptions.headerLeft && screenOptions.headerLeft({})}
          {children}
        </View>
      ),
      {
        Screen: ({ options }: { options?: NativeStackNavigationOptions }) => (
          <View>
            {options?.headerLeft && options.headerLeft({})}
            <Text>asdf</Text>
          </View>
        ),
      }
    ),
    Slot: () => <div data-testid="Slot" />,
    Redirect: jest.fn(),
    router: {
      canGoBack: jest.fn().mockReturnValue(true),
      canDismiss: jest.fn().mockReturnValue(true),
      dismissAll: jest.fn(),
      push: jest.fn(),
      back: jest.fn(),
      replace: jest.fn(),
      navigate: jest.fn(),
      setParams: jest.fn(),
    },
    useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
    usePathname: jest.fn(),
    useFocusEffect: jest.fn(),
    withLayoutContext: jest.fn().mockReturnValue(MockTopTabs),
  };
});
jest.mock("@react-native-async-storage/async-storage", () => {
  const mock = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  );

  return mock;
});

jest.mock("@contexts/auth", () => {
  const { defaultAuthContext } = jest.requireActual("@testdata/contexts");

  return {
    AuthProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useAuth: jest.fn().mockReturnValue(defaultAuthContext),
  };
});
jest.mock("@contexts/theme", () => {
  const { defaultThemeContext } = jest.requireActual("@testdata/contexts");

  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useTheme: jest.fn().mockReturnValue(defaultThemeContext),
  };
});

jest.mock("@services/storage", () => ({
  getSecure: jest.fn().mockResolvedValue("asdf"),
  removeSecure: jest.fn().mockResolvedValue({}),
  saveSecure: jest.fn().mockResolvedValue({}),
}));
