import { describe, expect, it } from "vitest";

import {
  InquiryDetailMetadata,
  sampleInquiryThreadDetail,
} from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquiryDetailMetadata", () => {
  it("should render user name and time since created", () => {
    const { getByText } = renderWithProviders(
      <InquiryDetailMetadata inquiry={sampleInquiryThreadDetail} />
    );

    expect(getByText("John Doe")).toBeInTheDocument();
  });
});
