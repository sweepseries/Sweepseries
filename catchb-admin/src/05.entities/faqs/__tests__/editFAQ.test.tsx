import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useEditFAQ } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

const MockEditComponent = () => {
  const { mutate: editFAQ, isSuccess } = useEditFAQ(1);

  const handleSubmit = () => {
    editFAQ({
      question: "Updated FAQ Question",
      answer: "This is an updated answer.",
      category_id: 2,
    });
  };

  return (
    <>
      <button onClick={handleSubmit} data-testid="edit-faq-button">
        Edit FAQ
      </button>
      {isSuccess && <div>FAQ edited successfully!</div>}
    </>
  );
};

describe("EditFAQ", () => {
  it("should call editFAQ mutation on button click", async () => {
    vi.spyOn(axios, "put").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockEditComponent />
    );

    fireEvent.click(getByTestId("edit-faq-button"));

    await waitFor(() => {
      expect(getByText("FAQ edited successfully!")).toBeInTheDocument();
    });
  });
});
