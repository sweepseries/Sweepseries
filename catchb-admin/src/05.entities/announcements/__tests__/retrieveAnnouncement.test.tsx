import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import {
  sampleAnnouncementDetails,
  useRetrieveAnnouncement,
} from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

const MockDetailComponent = () => {
  const { data, isSuccess } = useRetrieveAnnouncement(1);

  return (
    <div>
      {isSuccess && data ? <h1>{data.title}</h1> : <div>Loading...</div>}
    </div>
  );
};

describe("RetrieveAnnouncement", () => {
  it("should render announcement details", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleAnnouncementDetails,
    });

    const { findByText } = renderWithProviders(<MockDetailComponent />);

    expect(await findByText("Announcement 2")).toBeInTheDocument();
  });
});
