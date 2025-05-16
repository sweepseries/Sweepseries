import { UserProfileCard } from "@entities/users";
import { sampleUserProfile } from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: {children: React.ReactNode}) => <>{children}</>,
}));

describe("UserProfileCard", () => {
  it("should render correctly", () => {
    renderWithProviders(<UserProfileCard profile={{...sampleUserProfile}} />);
  });
});
