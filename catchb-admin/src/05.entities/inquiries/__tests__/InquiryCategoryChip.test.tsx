import { describe, it } from "vitest";

import {
  InquiryCategoryChip,
  sampleInquiryCategories,
} from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquiryCategoryChip", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <InquiryCategoryChip category={sampleInquiryCategories[0]} />
        <InquiryCategoryChip category={sampleInquiryCategories[1]} isActive />
      </>
    );
  });
});
