import { AppIcon } from "./AppIcon";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Icons");

describe("<AppIcon />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <AppIcon icon="home" />
        <AppIcon icon="home" color="black" size={24} />
      </>
    );
  });
});
