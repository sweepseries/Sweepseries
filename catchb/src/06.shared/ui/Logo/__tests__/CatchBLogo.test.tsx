import { CatchBMainLogo } from "@shared/ui/Logo";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Logo");
jest.mock("../mainlogo.svg", () => () => null);

describe("CatchBLogo", () => {
  it("should render correctly", () => {
    renderWithProviders(<CatchBMainLogo />);
  });
});
