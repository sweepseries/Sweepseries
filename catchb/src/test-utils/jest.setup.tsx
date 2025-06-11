/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";

jest.mock("expo-router", () => {
  const { View } = jest.requireActual("react-native");

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
          {screenOptions.headerLeft?.({})}
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
            {options?.headerLeft?.({})}
            {options?.headerRight?.({})}
            {options?.headerTitle && typeof options.headerTitle === "function"
              ? options.headerTitle({ children: "" })
              : options?.headerTitle}
          </View>
        ),
      }
    ),
    router: {
      back: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      canDismiss: jest.fn().mockReturnValue(true),
      dismissAll: jest.fn(),
    },
    useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
  };
});
jest.mock("expo-application", () => ({
  ...jest.requireActual("expo-application"),
  nativeApplicationVersion: "1.0.0",
}));
jest.mock("react-native-webview", () => ({
  WebView: () => null,
}));
jest.mock("react-native-skeleton-placeholder", () => {
  const { Text } = jest.requireActual("react-native");
  const Item = () => <Text>Loading Item</Text>;
  const SkeletonPlaceholder = ({ children }: { children: React.ReactNode }) =>
    children;

  SkeletonPlaceholder.Item = Item;

  return SkeletonPlaceholder;
});
jest.mock("@gorhom/bottom-sheet", () => {
  const { forwardRef } = jest.requireActual("react");

  return {
    __esModule: true,
    default: forwardRef(
      (
        {
          backdropComponent,
          children,
        }: {
          backdropComponent: React.FC<BottomSheetBackdropProps>;
          children: React.ReactNode;
        },
        ref: React.Ref<any>
      ) => (
        <>
          {backdropComponent?.({
            animatedIndex: {
              value: 0,
              get: jest.fn(),
              set: jest.fn(),
              modify: jest.fn(),
              addListener: jest.fn(),
              removeListener: jest.fn(),
            },
            animatedPosition: {
              value: 0,
              get: jest.fn(),
              set: jest.fn(),
              modify: jest.fn(),
              addListener: jest.fn(),
              removeListener: jest.fn(),
            },
          })}
          {children}
        </>
      )
    ),
    BottomSheetBackdrop: () => "BottomSheetBackdrop",
    BottomSheetBackdropProps: {},
    BottomSheetScrollView: ({ children }: { children: React.ReactNode }) =>
      children,
    BottomSheetView: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock("@entities/community/api/initialize", () => {
  const { sampleCommunityInitializerResponse } = jest.requireActual(
    "@entities/community/models/testdata"
  );

  return {
    initializeCommunity: jest
      .fn()
      .mockResolvedValue(sampleCommunityInitializerResponse),
  };
});

jest.mock("@shared/lib/alert", () => ({
  AlertProvider: ({ children }: { children: React.ReactNode }) => children,
  useAlert: jest.fn(() => ({
    showAlert: jest.fn(),
  })),
}));
jest.mock("@shared/lib/auth", () => {
  const { UserProfileType, sampleLoginData, sampleUserProfile } =
    jest.requireActual("@shared/lib/auth");

  return {
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuth: jest.fn(() => ({
      saveLoginStatus: jest.fn(),
      resetLoginStatus: jest.fn(),
      user: null,
      mode: "GUEST",
      isAuthenticated: false,
    })),
    UserProfileType,
    sampleLoginData,
    sampleUserProfile,
  };
});
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
  getStorage: jest.fn().mockResolvedValue("asdf"),
  removeStorage: jest.fn().mockResolvedValue({}),
  saveStorage: jest.fn().mockResolvedValue({}),
}));

jest.mock("@shared/ui/Buttons", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return {
    LoginButton: TouchableOpacity,
    LoginButtonText: Text,
    NavigateButton: ({
      onPress,
      text,
    }: {
      onPress: () => void;
      text: string;
    }) => (
      <TouchableOpacity onPress={onPress} testID={`${text}-button`}>
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
    TroubleShootButton: TouchableOpacity,
    TroubleShootText: Text,
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
  DefaultProfile: () => null,
}));
jest.mock("@shared/ui/Logo", () => ({
  CatchBMainLogo: jest.fn(() => null),
}));
jest.mock("@shared/ui/Selectors", () => {
  const { Text } = jest.requireActual("react-native");

  return {
    ChipSelector: () => null,
    MenuSelector: ({
      selected,
      renderLabel,
    }: {
      selected: any;
      renderLabel: (option: any) => string;
    }) => <Text>{renderLabel(selected)}</Text>,
  };
});
jest.mock("@shared/ui/TextInput", () => {
  const { TextInput } = jest.requireActual("react-native");

  return {
    AuthTextInput: TextInput,
  };
});

jest.mock("@widgets/layouts/ui/horizontallogo.svg", () => () => null);
jest.mock("@shared/ui/Logo/mainlogo.svg", () => () => null);

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
jest.mock("react-native-svg/css", () => ({
  SvgCssUri: "SvgCssUri",
}));
*/
