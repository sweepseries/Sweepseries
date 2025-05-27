import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useCreateTermForm } from "../hooks/useCreateTermForm";

const TestComponent = () => {
  const { isRequired } = useCreateTermForm();
  return (
    <div>
      <p>Is Required: {isRequired ? "Yes" : "No"}</p>
    </div>
  );
};

describe("useCreateTermForm", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useCreateTerm must be used within a CreateTermProvider"
    );
  });
});
