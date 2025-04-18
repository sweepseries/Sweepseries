import { SignUpForm } from "./SignUpForm";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@features/CatchB", () => ({
  CatchBLogo: () => <></>,
}));

describe("<SignUpForm />", () => {
  const commonProps = {
    title: "title",
    subtitle: "subtitle",
    buttonText: "button",
    buttonOnPress: jest.fn(),
    buttonDisabled: false,
  };

  it("should render", () => {
    renderWithProviders(
      <SignUpForm {...commonProps}>
        <></>
      </SignUpForm>
    );
  });
});
