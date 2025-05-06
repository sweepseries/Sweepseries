/* eslint-disable @typescript-eslint/no-explicit-any */
//import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
//import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
    push: jest.fn(),
  },
  useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
}));
jest.mock("react-native-skeleton-placeholder", () => {
  const { Text } = jest.requireActual("react-native");
  const Item = () => <Text>Loading Item</Text>;
  const SkeletonPlaceholder = ({ children }: { children: React.ReactNode }) =>
    children;

  SkeletonPlaceholder.Item = Item;

  return SkeletonPlaceholder;
});

jest.mock("@shared/lib/alert", () => ({
  AlertProvider: ({ children }: { children: React.ReactNode }) => children,
  useAlert: jest.fn(() => ({
    showAlert: jest.fn(),
  })),
}));
jest.mock("@shared/lib/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: jest.fn(() => ({
    saveLoginStatus: jest.fn(),
    resetLoginStatus: jest.fn(),
    user: null,
    mode: "GUEST",
    isAuthenticated: false,
  })),
}));
jest.mock("@shared/lib/colors", () => {
  const { sampleColors } = jest.requireActual("@shared/lib/colors");

  return {
    ColorsProvider: ({ children }: { children: React.ReactNode }) => children,
    useColors: () => ({
      colors: sampleColors,
    }),
    sampleColors,
  };
});
jest.mock("@shared/lib/storage", () => ({
  getSecure: jest.fn().mockResolvedValue("asdf"),
  removeSecure: jest.fn().mockResolvedValue({}),
  saveSecure: jest.fn().mockResolvedValue({}),
}));

jest.mock("@shared/ui/Buttons", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return {
    TextButton: ({
      text,
      onPress,
      active = true,
    }: {
      text: string;
      onPress: () => void;
      active?: boolean;
    }) => (
      <TouchableOpacity onPress={onPress} testID={text} disabled={!active} />
    ),
  };
});
jest.mock("@shared/ui/Dividers", () => ({
  Divider: () => null,
  VerticalDivider: () => null,
}));
jest.mock("@shared/ui/Icons", () => ({
  AppIcon: () => null,
}));
jest.mock("@shared/ui/Logo", () => ({
  CatchBMainLogo: jest.fn(() => null),
}));
jest.mock("@shared/ui/Selectors", () => ({
  Selector: () => null,
}));
jest.mock("@shared/ui/TextInput", () => ({
  AuthTextInput: () => null,
})); /*}

/*
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
          {/* if screen.options.headerTitle is a function, call it with an empty object */ /*}
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
    Tabs: Object.assign(
      ({
        children,
        screenOptions,
      }: {
        children: React.ReactNode;
        screenOptions: BottomTabNavigationOptions;
      }) => (
        <View>
          {screenOptions.headerLeft && screenOptions.headerLeft({})}
          {/* if screen.options.headerTitle is a function, call it with an empty object */ /*}
          {screenOptions.headerTitle &&
          typeof screenOptions.headerTitle === "function"
            ? screenOptions.headerTitle({ children: "" })
            : screenOptions.headerTitle}
          {children}
        </View>
      ),
      {
        Screen: ({ options }: { options?: BottomTabNavigationOptions }) => (
          <View>
            {options?.headerLeft && options.headerLeft({})}
            {options?.headerTitle && options.headerTitle}
            {options?.tabBarIcon &&
              options.tabBarIcon({ focused: true, color: "", size: 0 })}
          </View>
        ),
      }
    ),
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

jest.mock("@react-native-kakao/user", () => ({
  me: jest.fn(),
  login: jest.fn(),
  isLogined: jest.fn(),
}));
*/
