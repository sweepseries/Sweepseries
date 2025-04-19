import { AuthInputTitle, AuthTextInput } from "./_components";
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
