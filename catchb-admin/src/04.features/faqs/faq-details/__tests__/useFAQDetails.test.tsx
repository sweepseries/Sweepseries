import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useFAQDetails } from "@features/faqs/faq-details";

const TestComponent = () => {
  const { isLoading } = useFAQDetails();
  return (
    <div>
      <p>{isLoading}</p>
    </div>
  );
};

describe("useFAQDetails", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useFAQDetails must be used within a FAQDetailsProvider"
    );
  });
});
