import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useDeleteAnnouncement } from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

const MockDeleteComponent = () => {
  const { mutate: deleteAnnouncement, isSuccess } = useDeleteAnnouncement(1);

  const handleDelete = () => {
    deleteAnnouncement();
  };

  return (
    <>
      <button onClick={handleDelete} data-testid="delete-announcement-button">
        Delete Announcement
      </button>
      {isSuccess && <div>Announcement deleted successfully!</div>}
    </>
  );
};

describe("DeleteAnnouncement", () => {
  it("should call deleteAnnouncement mutation on button click", async () => {
    vi.spyOn(axios, "delete").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockDeleteComponent />
    );

    fireEvent.click(getByTestId("delete-announcement-button"));

    await waitFor(() => {
      expect(
        getByText("Announcement deleted successfully!")
      ).toBeInTheDocument();
    });
  });
});
