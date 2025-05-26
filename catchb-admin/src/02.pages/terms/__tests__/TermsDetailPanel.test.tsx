import { describe, expect, it } from "vitest";

import { TermsDetailPanel } from "../ui/TermsDetail/TermsDetailPanel";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermsDetailPanel", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<TermsDetailPanel />);

    expect(getByText("Terms Detail")).toBeInTheDocument();
    expect(getByText("Details about a specific term.")).toBeInTheDocument();
  });
});
