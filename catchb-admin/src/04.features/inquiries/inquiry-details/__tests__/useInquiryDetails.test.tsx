import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useInquiryDetails } from "@features/inquiries/inquiry-details";

const TestComponent = () => {
  const { isLoading } = useInquiryDetails();
  return (
    <div>
      <p>{isLoading ? "Loading..." : "Loaded"}</p>
    </div>
  );
};

describe("useInquiryDetails", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useInquiryDetails must be used within an InquiryDetailsProvider"
    );
  });
});
