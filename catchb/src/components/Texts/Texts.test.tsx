import { HeaderTitle } from "./HeaderTitle";
import { renderWithProviders } from "@utils/test-utils";

describe("<HeaderTitle />", () => {
  it("renders correctly", () => {
    renderWithProviders(<HeaderTitle>Test Header</HeaderTitle>);
  });
});
