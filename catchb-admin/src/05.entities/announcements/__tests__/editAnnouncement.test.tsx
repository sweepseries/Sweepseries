import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useEditAnnouncement } from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

const MockEditComponent = () => {
  const { mutate: editAnnouncement, isSuccess } = useEditAnnouncement(1);

  const handleSubmit = () => {
    editAnnouncement({
      title: "Updated Announcement",
      content: "This is an updated announcement.",
      is_important: false,
    });
  };

  return (
    <>
      <button onClick={handleSubmit} data-testid="edit-announcement-button">
        Edit Announcement
      </button>
      {isSuccess && <div>Announcement edited successfully!</div>}
    </>
  );
};

describe("EditAnnouncement", () => {
  it("should call editAnnouncement mutation on button click", async () => {
    vi.spyOn(axios, "put").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockEditComponent />
    );

    fireEvent.click(getByTestId("edit-announcement-button"));

    await waitFor(() => {
      expect(
        getByText("Announcement edited successfully!")
      ).toBeInTheDocument();
    });
  });
});
