import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { usePostInquiryNotes } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

const MockPostInquiryNotesComponent = () => {
  const { mutate: postInquiryNotes, isSuccess } = usePostInquiryNotes(1);

  const handleSubmit = () => {
    postInquiryNotes({
      content: "This is a test note.",
    });
  };

  return (
    <>
      <button onClick={handleSubmit} data-testid="post-inquiry-notes-button">
        Post Inquiry Notes
      </button>
      {isSuccess && <div>Inquiry notes posted successfully!</div>}
    </>
  );
};

describe("PostInquiryNotes", () => {
  it("should call postInquiryNotes mutation on button click", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockPostInquiryNotesComponent />
    );

    fireEvent.click(getByTestId("post-inquiry-notes-button"));

    await waitFor(() => {
      expect(
        getByText("Inquiry notes posted successfully!")
      ).toBeInTheDocument();
    });
  });
});
