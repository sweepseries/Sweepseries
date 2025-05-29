import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useEditTermContents } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const MockEditComponent = ({ termId }: { termId: number }) => {
  const { mutate: editTermContents, isSuccess } = useEditTermContents(termId);

  const handleSubmit = () => {
    editTermContents({
      version_id: 1,
      content: "Updated content for the term.",
    });
  };

  return (
    <>
      <button onClick={handleSubmit} data-testid="edit-term-button">
        Edit Term Contents
      </button>
      {isSuccess && <div>Term contents updated successfully!</div>}
    </>
  );
};

describe("EditTermContents", () => {
  it("should call editTermContents mutation on button click", async () => {
    const termId = 1;
    vi.spyOn(axios, "patch").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockEditComponent termId={termId} />
    );

    fireEvent.click(getByTestId("edit-term-button"));

    await waitFor(() => {
      expect(
        getByText("Term contents updated successfully!")
      ).toBeInTheDocument();
    });
  });
});
