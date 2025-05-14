import { InquirySimple, sampleInquiries } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquirySimple", () => {
  it("should render correctly", () => {
    const { getByText } = renderWithProviders(
      <InquirySimple inquiry={sampleInquiries[0]} />
    );

    expect(getByText("[Category 1] Inquiry 1")).toBeTruthy();
  });
});
