import { TermSimple, sampleTerms } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermSimple", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <>
        <TermSimple
          term={sampleTerms[0]}
          isChecked={true}
          toggleCheck={jest.fn()}
        />
        <TermSimple
          term={sampleTerms[1]}
          isChecked={false}
          toggleCheck={jest.fn()}
        />
      </>
    );
  });
});
