import {
  AuthInputTitle,
  AuthTextInput,
  PhoneNumberInputs,
} from "./_components";
import { renderWithProviders } from "@utils/test-utils";

describe("<AuthTextInput />", () => {
  it("renders correctly", () => {
    renderWithProviders(<AuthTextInput placeholder="Test" />);
  });
});

describe("<AuthInputTitle />", () => {
  it("renders correctly", () => {
    renderWithProviders(<AuthInputTitle>Test</AuthInputTitle>);
  });
});

describe("<PhoneNumberInputs />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <PhoneNumberInputs
        middleNumber="1234"
        lastNumber="5678"
        setMiddleNumber={jest.fn()}
        setLastNumber={jest.fn()}
      />
    );
  });
});
