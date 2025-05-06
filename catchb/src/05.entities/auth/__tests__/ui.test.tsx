import {
  LoginButton,
  LoginButtonText,
  TroubleShootButton,
  TroubleShootText,
} from "@entities/auth";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => (
  <>
    <LoginButton>
      <LoginButtonText>Login</LoginButtonText>
    </LoginButton>
    <TroubleShootButton>
      <TroubleShootText>Need help?</TroubleShootText>
    </TroubleShootButton>
  </>
);

describe("LoginButtons", () => {
  it("renders LoginButton and TroubleShootButton correctly", () => {
    renderWithProviders(<TestComponent />);
  });
});
