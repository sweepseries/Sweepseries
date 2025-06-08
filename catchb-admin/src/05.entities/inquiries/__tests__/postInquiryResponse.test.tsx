import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { usePostInquiryResponse } from "../api/postInquiryResponse";
import { renderWithProviders } from "@test-utils/renderer";

const MockPostInquiryResponseComponent = () => {
  const { mutate: postInquiryResponse, isSuccess } = usePostInquiryResponse(1);

  const handleSubmit = () => {
    postInquiryResponse({
      content: "This is a test response.",
    });
  };

  return (
    <>
      <button onClick={handleSubmit} data-testid="post-inquiry-response-button">
        Post Inquiry Response
      </button>
      {isSuccess && <div>Inquiry response posted successfully!</div>}
    </>
  );
};

describe("PostInquiryResponse", () => {
  it("should call postInquiryResponse mutation on button click", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByTestId, getByText } = renderWithProviders(
      <MockPostInquiryResponseComponent />
    );

    fireEvent.click(getByTestId("post-inquiry-response-button"));

    await waitFor(() => {
      expect(
        getByText("Inquiry response posted successfully!")
      ).toBeInTheDocument();
    });
  });
});
