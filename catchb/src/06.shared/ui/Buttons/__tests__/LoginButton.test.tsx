import {
  LoginButton,
  LoginButtonText,
  TroubleShootButton,
  TroubleShootText,
} from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Buttons");

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
