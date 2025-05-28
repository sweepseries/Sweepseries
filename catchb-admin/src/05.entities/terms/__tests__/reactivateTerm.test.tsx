import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useReactivateTerm } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const MockReactivateComponent = () => {
  const { mutate: reactivateTerm, isSuccess } = useReactivateTerm(1);

  const handleReactivate = () => {
    reactivateTerm(1);
  };

  return (
    <>
      <button onClick={handleReactivate} data-testid="reactivate-term-button">
        Reactivate Term
      </button>
      {isSuccess && <div>Term reactivated successfully!</div>}
    </>
  );
};

describe("ReactivateTerm", () => {
  it("should call reactivateTerm mutation on button click", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockReactivateComponent />
    );

    fireEvent.click(getByTestId("reactivate-term-button"));

    await waitFor(() => {
      expect(getByText("Term reactivated successfully!")).toBeInTheDocument();
    });
  });
});
