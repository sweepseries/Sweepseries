import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useInquiriesList } from "@features/inquiries/list-inquiries";

const TestComponent = () => {
  const { isLoading } = useInquiriesList();
  return (
    <div>
      <p>{isLoading ? "Loading..." : "Loaded"}</p>
    </div>
  );
};

describe("useInquiriesList", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useInquiriesList must be used within an InquiriesListProvider"
    );
  });
});
