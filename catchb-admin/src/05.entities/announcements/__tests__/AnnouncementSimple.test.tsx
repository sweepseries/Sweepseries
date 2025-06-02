import { describe, it } from "vitest";

import {
  AnnouncementSimple,
  sampleAnnouncements,
} from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

describe("AnnouncementSimple", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <AnnouncementSimple announcement={sampleAnnouncements[0]} />
        <AnnouncementSimple announcement={sampleAnnouncements[1]} />
      </>
    );
  });
});
