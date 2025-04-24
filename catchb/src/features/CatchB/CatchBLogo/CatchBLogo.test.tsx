import { CatchBLogo } from "./CatchBLogo";
import { renderWithProviders } from "@utils/test-utils";

describe("<CatchBLogo />", () => {
  it("renders correctly with default props", () => {
    renderWithProviders(
      <>
        <CatchBLogo />
        <CatchBLogo type="horizontal" />
      </>
    );
  });
});
