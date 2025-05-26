import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useTermsList } from "@features/terms/list-terms";

const TestComponent = () => {
  const { mode } = useTermsList();
  return (
    <div>
      <p>Current mode: {mode}</p>
      </div>
    );
};

describe("useTermsList", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useTermsList must be used within a TermsListProvider"
    );
  });
});
