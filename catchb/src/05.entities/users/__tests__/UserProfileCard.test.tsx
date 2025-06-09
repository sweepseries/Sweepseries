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

describe("UserProfileCard", () => {
  it("should render profile image correctly", () => {
    const { getByTestId } = renderWithProviders(
      <UserProfileCard profile={sampleUserProfile} editPress={jest.fn()} />
    );

    expect(getByTestId("image")).toBeTruthy();
  });

  it("should fall back to default profile", () => {
    renderWithProviders(
      <UserProfileCard
        profile={{ ...sampleUserProfile, profile_image: null }}
        editPress={jest.fn()}
      />
    );
  });
});
