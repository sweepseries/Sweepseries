import { TermSimple } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermSimple", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <>
        <TermSimple
          title="Checked Term"
          checked={true}
          toggleChecked={jest.fn()}
          pressRead={jest.fn()}
        />
        <TermSimple
          title="Unchecked Term"
          checked={false}
          toggleChecked={jest.fn()}
          pressRead={jest.fn()}
        />
      </>
    );
  });
});
