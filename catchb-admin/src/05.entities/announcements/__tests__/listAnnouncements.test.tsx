import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import { sampleAnnouncements, useAnnouncements } from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = () => {
  const { data, isSuccess } = useAnnouncements();

  return (
    <div>
      {isSuccess && data ? (
        <>
          {data.map((announcement) => (
            <div key={announcement.id}>{announcement.title}</div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

describe("ListAnnouncements", () => {
  it("should render announcements list", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleAnnouncements,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(await findByText("Announcement 1")).toBeInTheDocument();
    expect(await findByText("Announcement 2")).toBeInTheDocument();
  });
});
