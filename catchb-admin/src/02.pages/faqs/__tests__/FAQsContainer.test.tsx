import { describe, expect, it, vi } from "vitest";

import { FAQsContainer } from "../ui/FAQsContainer";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/_layout", () => ({
  FAQsManagementLayout: vi.fn(() => <div>FAQs Management Layout</div>),
}));

describe("FAQsContainer", () => {
  it("renders FAQsManagementLayout with nested routes", () => {
    const { getByText } = renderWithProviders(<FAQsContainer />);

    expect(getByText("FAQs Management Layout")).toBeInTheDocument();
  });
});
