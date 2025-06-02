import { describe, expect, it } from "vitest";
import { fireEvent } from "@testing-library/react";

import {
  AnnouncementForm,
  AnnouncementFormProvider,
  useAnnouncementForm,
} from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

const TestResetComponent = () => {
  const { resetForm } =
    useAnnouncementForm();

  return (
      <button onClick={resetForm} data-testid="reset-button">
        Reset Form
      </button>
  );
}

describe("AnnouncementFormProvider", () => {
  it("should provide initial values and allow updates", () => {
    const { getByTestId } = renderWithProviders(
      <AnnouncementFormProvider>
        <AnnouncementForm />
        <TestResetComponent />
      </AnnouncementFormProvider>
    );

    const titleInput = getByTestId("textinput-공지 제목");
    const contentTextarea = getByTestId("textarea-공지 내용");
    const toggleButton = getByTestId("checkbox-중요 공지");

    // Update form
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(contentTextarea, { target: { value: "New Content" } });
    fireEvent.click(toggleButton);

    expect(titleInput).toHaveValue("New Title");
    expect(contentTextarea).toHaveValue("New Content");
    expect(toggleButton).toBeChecked();

    // Reset form
    fireEvent.click(getByTestId("reset-button"));
    expect(titleInput).toHaveValue("");
    expect(contentTextarea).toHaveValue("");
    expect(toggleButton).not.toBeChecked();
  });

  it("should throw an error if used outside of AnnouncementFormProvider", () => {
    expect(() => renderWithProviders(<AnnouncementForm />)).toThrowError(
      "useAnnouncementForm must be used within an AnnouncementFormProvider"
    );
  });
});
