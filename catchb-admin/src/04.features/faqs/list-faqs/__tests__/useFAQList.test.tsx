import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useFAQList } from "@features/faqs/list-faqs";

const TestComponent = () => {
  const { isLoading } = useFAQList();
  return (
    <div>
      <p>{isLoading}</p>
    </div>
  );
};

describe("useFAQList", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useFAQList must be used within a FAQListProvider"
    );
  });
});
