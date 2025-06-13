import { CommunityIcon } from "@shared/ui/Icons";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Icons");

jest.mock("../files/KBO.svg", () => () => null);

describe("CommunityIcon", () => {
  it("should render correctly with valid icon", () => {
    renderWithProviders(
      <>
        <CommunityIcon icon="KBO" />
        <CommunityIcon icon="non-existant-icon" />
      </>
    );
  });
});
