import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useReactivateFAQ } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

const MockReactivateComponent = () => {
  const { mutate: reactivateFAQ, isSuccess } = useReactivateFAQ(1);

  const handleReactivate = () => {
    reactivateFAQ();
  };

  return (
    <>
      <button onClick={handleReactivate} data-testid="reactivate-faq-button">
        Reactivate FAQ
      </button>
      {isSuccess && <div>FAQ reactivated successfully!</div>}
    </>
  );
};

describe("ReactivateFAQ", () => {
  it("should call reactivateFAQ mutation on button click", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockReactivateComponent />
    );

    fireEvent.click(getByTestId("reactivate-faq-button"));

    await waitFor(() => {
      expect(getByText("FAQ reactivated successfully!")).toBeInTheDocument();
    });
  });
});
