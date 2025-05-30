import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useAnnouncementsList } from "@features/announcements/list-announcements";

const TestComponent = () => {
  const { mode } = useAnnouncementsList();
  return (
    <div>
      <p>Current mode: {mode}</p>
    </div>
  );
};

describe("useAnnouncementsList", () => {
  it("should throw an error if used outside of provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useAnnouncementsList must be used within an AnnouncementsListProvider"
    );
  });
});
