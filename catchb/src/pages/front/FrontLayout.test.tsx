import { FrontLayout } from "./FrontLayout";
import { renderWithProviders } from "@utils/test-utils";

describe("<FrontLayout />", () => {
  it("renders correctly", () => {
    renderWithProviders(<FrontLayout />);
  });
});
