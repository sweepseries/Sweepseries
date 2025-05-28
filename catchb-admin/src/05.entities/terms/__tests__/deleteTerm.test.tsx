import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useDeleteTerm } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const MockDeleteComponent = () => {
  const { mutate: deleteTerm, isSuccess } = useDeleteTerm(1);

  const handleDelete = () => {
    deleteTerm(1);
  };

  return (
    <>
      <button onClick={handleDelete} data-testid="delete-term-button">
        Delete Term
      </button>
      {isSuccess && <div>Term deleted successfully!</div>}
    </>
  );
};

describe("DeleteTerm", () => {
  it("should call deleteTerm mutation on button click", async () => {
    vi.spyOn(axios, "delete").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockDeleteComponent />
    );

    fireEvent.click(getByTestId("delete-term-button"));

    await waitFor(() => {
      expect(getByText("Term deleted successfully!")).toBeInTheDocument();
    });
  });
});
