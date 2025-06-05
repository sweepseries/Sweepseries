import { describe, it, expect, vi } from "vitest";

import { InquiriesContainer } from "../ui/InquiriesContainer";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/_layout", () => ({
  InquiriesManagementLayout: vi.fn(() => (
    <div>Inquiries Management Layout</div>
  )),
}));

describe("InquiriesContainer", () => {
  it("renders InquiriesManagementLayout with nested routes", () => {
    const { getByText } = renderWithProviders(<InquiriesContainer />);

    expect(getByText("Inquiries Management Layout")).toBeInTheDocument();
  });
});
