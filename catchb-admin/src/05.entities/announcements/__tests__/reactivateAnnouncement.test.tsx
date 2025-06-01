import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useReactivateAnnouncement } from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

const MockReactivateComponent = () => {
  const { mutate: reactivateAnnouncement, isSuccess } =
    useReactivateAnnouncement(1);

  const handleReactivate = () => {
    reactivateAnnouncement();
  };

  return (
    <>
      <button
        onClick={handleReactivate}
        data-testid="reactivate-announcement-button"
      >
        Reactivate Announcement
      </button>
      {isSuccess && <div>Announcement reactivated successfully!</div>}
    </>
  );
};

describe("ReactivateAnnouncement", () => {
  it("should call reactivateAnnouncement mutation on button click", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockReactivateComponent />
    );

    fireEvent.click(getByTestId("reactivate-announcement-button"));

    await waitFor(() => {
      expect(
        getByText("Announcement reactivated successfully!")
      ).toBeInTheDocument();
    });
  });
});
