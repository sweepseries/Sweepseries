import { InquiriesLayout } from "../InquiriesLayout";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquiriesLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<InquiriesLayout />);
  });
});
