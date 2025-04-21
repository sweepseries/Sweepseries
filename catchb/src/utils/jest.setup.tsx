/* eslint-disable @typescript-eslint/no-explicit-any */
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

jest.mock("expo-router", () => {
  const { TouchableOpacity, View } = jest.requireActual("react-native");

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
          {/* if screen.options.headerTitle is a function, call it with an empty object */}
          {screenOptions.headerTitle &&
          typeof screenOptions.headerTitle === "function"
            ? screenOptions.headerTitle({ children: "" })
            : screenOptions.headerTitle}
          {children}
        </View>
      ),
      {
        Screen: ({ options }: { options?: NativeStackNavigationOptions }) => (
          <View>
            {options?.headerLeft && options.headerLeft({})}
            {options?.headerTitle && options.headerTitle}
          </View>
        ),
      }
    ),
    Slot: () => <div data-testid="Slot" />,
    SplashScreen: {
      preventAutoHideAsync: jest.fn(),
      hideAsync: jest.fn(),
    },
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
jest.mock("react-native-gesture-handler", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return {
    ...jest.requireActual("react-native-gesture-handler"),
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => (
      <TouchableOpacity>{children}</TouchableOpacity>
    ),
  };
});
jest.mock("react-native-svg/css", () => ({
  SvgCssUri: "SvgCssUri",
}));
jest.mock("@react-native-async-storage/async-storage", () => {
  const mock = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  );

  return mock;
});

jest.mock("@components/Buttons", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return {
    BackButton: ({ onPress }: { onPress: () => void }) => (
      <TouchableOpacity onPress={onPress} testID="back-button" />
    ),
    LoginButton: ({ type, onPress }: { type: string; onPress: () => void }) => (
      <TouchableOpacity onPress={onPress} testID={`${type}-button`} />
    ),
    TextButton: ({ text, onPress }: { text: string; onPress: () => void }) => (
      <TouchableOpacity onPress={onPress} testID={text} />
    ),
  };
});
jest.mock("@components/Dividers", () => ({
  Divider: () => null,
  VerticalDivider: () => null,
}));
jest.mock("@components/Icons", () => ({
  AppIcon: () => null,
}));
jest.mock("@components/Texts", () => ({
  HeaderTitle: () => <div />,
}));

jest.mock("@contexts/app", () => {
  const { defaultAlertContext } = jest.requireActual("@testdata/contexts");

  return {
    AlertProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useAlert: jest.fn().mockReturnValue(defaultAlertContext),
  };
});
jest.mock("@contexts/auth", () => {
  const { defaultAuthContext, defaultSignupContext } =
    jest.requireActual("@testdata/contexts");

  return {
    AuthProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useAuth: jest.fn().mockReturnValue(defaultAuthContext),
    SignupProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useSignup: jest.fn().mockReturnValue(defaultSignupContext),
  };
});
jest.mock("@contexts/theme", () => {
  const { ThemeColorType, lightColors } = jest.requireActual("@contexts/theme");
  const { defaultThemeContext } = jest.requireActual("@testdata/contexts");

  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    ThemeColorType,
    useTheme: jest.fn().mockReturnValue(defaultThemeContext),
    lightColors,
  };
});

jest.mock("@features/Auth", () => {
  const { TextInput, TouchableOpacity, View } =
    jest.requireActual("react-native");

  return {
    AuthInputTitle: () => <View />,
    AuthTextInput: ({
      onChangeText,
      placeholder,
    }: {
      onChangeText: (value: string) => void;
      placeholder: string;
    }) => <TextInput onChangeText={onChangeText} testID={placeholder} />,
    PhoneNumberInputs: ({
      setMiddleNumber,
      setLastNumber,
    }: {
      setMiddleNumber: (value: string) => void;
      setLastNumber: (value: string) => void;
    }) => (
      <View>
        <TextInput onChangeText={setMiddleNumber} testID="middle-number" />
        <TextInput onChangeText={setLastNumber} testID="last-number" />
      </View>
    ),
    SignUpForm: ({
      children,
      buttonOnPress,
    }: {
      children: React.ReactNode;
      buttonOnPress: () => void;
    }) => (
      <View>
        {children}
        <TouchableOpacity onPress={buttonOnPress} testID="button" />
      </View>
    ),
  };
});

jest.mock("@services/storage", () => ({
  getSecure: jest.fn().mockResolvedValue("asdf"),
  removeSecure: jest.fn().mockResolvedValue({}),
  saveSecure: jest.fn().mockResolvedValue({}),
}));
