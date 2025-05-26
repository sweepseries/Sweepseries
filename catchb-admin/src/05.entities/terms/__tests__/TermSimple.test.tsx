import { describe, it } from "vitest";

import { TermListHeaderRow, TermListRow, sampleTerms } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermSimple", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <TermListHeaderRow />
        <TermListRow term={sampleTerms[0]} />
        <TermListRow term={sampleTerms[2]} />
      </>
    );
  });
});
