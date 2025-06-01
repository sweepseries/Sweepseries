import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useCreateAnnouncementForm } from "../hooks/useCreateAnnouncementForm";

const TestComponent = () => {
  const { isImportant } = useCreateAnnouncementForm();
  return (
    <div>
      <p>{isImportant}</p>
    </div>
  );
};

describe("useCreateAnnouncementForm", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useCreateAnnouncementForm must be used within a CreateAnnouncementProvider"
    );
  });
});
