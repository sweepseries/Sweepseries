import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useAnnouncementDetails } from "@features/announcements/announcement-details";

const TestComponent = () => {
  const { isLoading } = useAnnouncementDetails();
  return (
    <div>
      <p>{isLoading ? "Loading..." : "Data loaded successfully."}</p>
    </div>
  );
};

describe("useAnnouncementDetails", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useAnnouncementDetails must be used within an AnnouncementDetailsProvider"
    );
  });
});
