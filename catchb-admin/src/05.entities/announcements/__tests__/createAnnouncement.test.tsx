import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useCreateAnnouncement } from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

const MockCreateComponent = () => {
  const { mutate: createAnnouncement, isSuccess } = useCreateAnnouncement();

  const handleSubmit = () => {
    createAnnouncement({
      title: "New Announcement",
      content: "This is a new announcement.",
      is_important: true,
    });
  };

  return (
    <>
      <button onClick={handleSubmit} data-testid="create-announcement-button">
        Create Announcement
      </button>
      {isSuccess && <div>Announcement created successfully!</div>}
    </>
  );
};

describe("CreateAnnouncement", () => {
  it("should call createAnnouncement mutation on button click", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockCreateComponent />
    );

    fireEvent.click(getByTestId("create-announcement-button"));

    await waitFor(() => {
      expect(
        getByText("Announcement created successfully!")
      ).toBeInTheDocument();
    });
  });
});
