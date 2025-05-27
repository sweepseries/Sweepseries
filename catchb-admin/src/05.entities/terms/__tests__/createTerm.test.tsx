import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useCreateTerm } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const MockCreateComponent = () => {
  const { mutate: createTerm, isSuccess } = useCreateTerm();

  const handleSubmit = () => {
    createTerm({
      title: "New Term",
      content: "This is a new term.",
      is_required: true,
    });
  };

  return (
    <>
      <button onClick={handleSubmit} data-testid="create-term-button">
        Create Term
      </button>
      {isSuccess && <div>Term created successfully!</div>}
    </>
  );
};

describe("CreateTerm", () => {
  it("should call createTerm mutation on button click", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockCreateComponent />
    );

    fireEvent.click(getByTestId("create-term-button"));

    await waitFor(() => {
      expect(getByText("Term created successfully!")).toBeInTheDocument();
    });
  });
});
