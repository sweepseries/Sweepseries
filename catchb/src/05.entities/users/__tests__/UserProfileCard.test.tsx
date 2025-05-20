import { fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import { UserProfileCard } from "@entities/users";
import { sampleUserProfile } from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

jest.mock("expo-image", () => {
  const { View } = jest.requireActual("react-native");

  return {
    Image: () => <View testID="image" />,
  };
});
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("../ui/files/default_profile.svg", () => {
  const { View } = jest.requireActual("react-native");

  return {
    __esModule: true,
    default: () => <View testID="default-profile" />,
  };
});

describe("UserProfileCard", () => {
  it("should render profile image correctly", () => {
    const { getByTestId } = renderWithProviders(
      <UserProfileCard profile={sampleUserProfile} />
    );

    expect(getByTestId("image")).toBeTruthy();

    fireEvent.press(getByTestId("edit-profile"));
    expect(router.push).toHaveBeenCalledWith("/mypage/profile");
  });

  it("should fall back to default profile", () => {
    const { getByTestId } = renderWithProviders(
      <UserProfileCard
        profile={{ ...sampleUserProfile, profile_image: null }}
      />
    );

    expect(getByTestId("default-profile")).toBeTruthy();
  });
});
