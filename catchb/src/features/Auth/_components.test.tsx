import {
  AuthInputTitle,
  AuthTextInput,
  BirthdateInputs,
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

describe("<BirthdateInputs />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <BirthdateInputs
        year="2023"
        month="10"
        day="01"
        setYear={jest.fn()}
        setMonth={jest.fn()}
        setDay={jest.fn()}
      />
    );
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
