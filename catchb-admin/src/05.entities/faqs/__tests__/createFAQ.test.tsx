import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useCreateFAQ } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

const MockCreateComponent = () => {
  const { mutate: createFAQ, isSuccess } = useCreateFAQ();

  const handleSubmit = () => {
    createFAQ({
      question: "What is the return policy?",
      answer: "You can return items within 30 days.",
      category_id: 1,
    });
  };

  return (
    <>
      <button onClick={handleSubmit} data-testid="create-faq-button">
        Create FAQ
      </button>
      {isSuccess && <div>FAQ created successfully!</div>}
    </>
  );
};

describe("CreateFAQ", () => {
  it("should call createFAQ mutation on button click", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockCreateComponent />
    );

    fireEvent.click(getByTestId("create-faq-button"));

    await waitFor(() => {
      expect(getByText("FAQ created successfully!")).toBeInTheDocument();
    });
  });
});
