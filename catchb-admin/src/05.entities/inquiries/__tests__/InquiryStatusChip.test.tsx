import { describe, it } from "vitest";

import { InquiryStatusChip, sampleInquiryStatuses } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquiryCategoryChip", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <InquiryStatusChip status={sampleInquiryStatuses[0]} />
        <InquiryStatusChip status={sampleInquiryStatuses[1]} isActive />
      </>
    );
  });
});
