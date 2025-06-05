import { describe, it, expect } from "vitest";

import { InquirySimple, sampleInquiryThreads } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquirySimple", () => {
  it("renders correctly (regular user)", () => {
    const { getByText } = renderWithProviders(
      <InquirySimple inquiry={sampleInquiryThreads[0]} />
    );

    expect(getByText("How to reset my password?")).toBeInTheDocument();
  });

  it("renders correctly (anonymous user)", () => {
    const { getByText } = renderWithProviders(
      <InquirySimple inquiry={sampleInquiryThreads[1]} />
    );

    expect(getByText("What payment methods are accepted?")).toBeInTheDocument();
  });
});
