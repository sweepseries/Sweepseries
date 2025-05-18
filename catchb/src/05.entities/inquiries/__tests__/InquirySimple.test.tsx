import { fireEvent } from "@testing-library/react-native";

import { InquirySimple, sampleInquiries } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquirySimple", () => {
  it("should render correctly", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <>
        <InquirySimple inquiry={sampleInquiries[0]} />
        <InquirySimple inquiry={sampleInquiries[1]} />
        <InquirySimple inquiry={sampleInquiries[2]} />
      </>
    );

    expect(getByText("[Category 1] Inquiry 1")).toBeTruthy();

    fireEvent.press(getByTestId("inquiry-1"));
  });
});
