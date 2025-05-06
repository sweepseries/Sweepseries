import { SignupLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("SignupLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<SignupLayout />);
  });
});
