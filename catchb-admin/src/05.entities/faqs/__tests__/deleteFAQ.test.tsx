import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useDeleteFAQ } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

const MockDeleteComponent = () => {
  const { mutate: deleteFAQ, isSuccess } = useDeleteFAQ(1);

  const handleDelete = () => {
    deleteFAQ();
  };

  return (
    <>
      <button onClick={handleDelete} data-testid="delete-faq-button">
        Delete FAQ
      </button>
      {isSuccess && <div>FAQ deleted successfully!</div>}
    </>
  );
};

describe("DeleteFAQ", () => {
  it("should call deleteFAQ mutation on button click", async () => {
    vi.spyOn(axios, "delete").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockDeleteComponent />
    );

    fireEvent.click(getByTestId("delete-faq-button"));

    await waitFor(() => {
      expect(getByText("FAQ deleted successfully!")).toBeInTheDocument();
    });
  });
});
