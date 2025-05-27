import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useTermDetails } from "../hooks/useTermDetails";

const TestComponent = () => {
  const { isLoading } = useTermDetails();
  return (
    <div>
      <p>Loading state: {isLoading ? "Loading..." : "Loaded"}</p>
    </div>
  );
};

describe("useTermDetails", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useTermDetails must be used within a TermDetailsProvider"
    );
  });
});
