import { describe, expect, it, vi } from "vitest";

import { TermsContainer } from "../ui/TermsContainer";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/_layout", () => ({
  TermsManagementLayout: vi.fn(() => <div>Terms Management Layout</div>),
}));
vi.mock("../ui/CreateTerm/CreateTermPanel", () => ({
  CreateTermPanel: vi.fn(() => <div>Create Term Panel</div>),
}));
vi.mock("../ui/TermsDetail/TermsDetailPanel", () => ({
  TermsDetailPanel: vi.fn(() => <div>Terms Detail Panel</div>),
}));

describe("TermsContainer", () => {
  it("renders TermsManagementLayout with nested routes", () => {
    const { getByText } = renderWithProviders(<TermsContainer />);

    expect(getByText("Terms Management Layout")).toBeInTheDocument();
  });
});
