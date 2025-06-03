import { describe, expect, it } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import {
  FAQForm,
  FAQFormProvider,
  sampleFAQListResponse,
  useFAQForm,
} from "@entities/faqs";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

const TestResetComponent = () => {
  const { resetForm } = useFAQForm();

  return (
    <button onClick={resetForm} data-testid="reset-button">
      Reset Form
    </button>
  );
};

describe("FAQFormProvider", () => {
  it("should provide initial values and allow updates", async () => {
    const client = createTestQueryClient();
    client.setQueryData(["faqs"], sampleFAQListResponse);

    const { getByTestId } = renderWithProviders(
      <FAQFormProvider>
        <FAQForm />
        <TestResetComponent />
      </FAQFormProvider>,
      { client }
    );

    const questionInput = getByTestId("textinput-질문");
    const answerTextarea = getByTestId("textarea-답변");

    // Update form
    fireEvent.change(questionInput, { target: { value: "New Question" } });
    fireEvent.change(answerTextarea, { target: { value: "New Answer" } });
    fireEvent.click(getByTestId("category-filter-Technical"));

    await waitFor(() => {
      expect(questionInput).toHaveValue("New Question");
      expect(answerTextarea).toHaveValue("New Answer");
    });

    // Reset form
    fireEvent.click(getByTestId("reset-button"));
  });

  it("should return nothing if there are no categories", () => {
    const client = createTestQueryClient();
    client.setQueryData(["faqs"], { ...sampleFAQListResponse, categories: [] });

    renderWithProviders(
      <FAQFormProvider>
        <FAQForm />
        <TestResetComponent />
      </FAQFormProvider>,
      { client }
    );
  });

  it("should throw an error if used outside of FAQFormProvider", () => {
    expect(() => renderWithProviders(<FAQForm />)).toThrowError(
      "useFAQForm must be used within a FAQFormProvider"
    );
  });
});
