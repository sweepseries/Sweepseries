import { describe, expect, it } from "vitest";

import {
  AnnouncementFormProvider,
  useAnnouncementForm,
} from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";
import { fireEvent } from "@testing-library/dom";

const TestComponent = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    isImportant,
    setIsImportant,
    resetForm,
  } = useAnnouncementForm();

  const toggleIsImportant = () => {
    setIsImportant(!isImportant);
  };

  return (
    <div>
      <input
        data-testid="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        data-testid="content-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button data-testid="toggle-important" onClick={toggleIsImportant}>
        {isImportant ? "Unmark Important" : "Mark Important"}
      </button>
      <button data-testid="reset-form" onClick={resetForm}>
        Reset Form
      </button>
    </div>
  );
};

describe("AnnouncementFormProvider", () => {
  it("should provide initial values and allow updates", () => {
    const { getByTestId } = renderWithProviders(
      <AnnouncementFormProvider>
        <TestComponent />
      </AnnouncementFormProvider>
    );

    const titleInput = getByTestId("title-input");
    const contentTextarea = getByTestId("content-textarea");
    const toggleButton = getByTestId("toggle-important");
    const resetButton = getByTestId("reset-form");

    // Initial values
    expect(titleInput).toHaveValue("");
    expect(contentTextarea).toHaveValue("");
    expect(toggleButton).toHaveTextContent("Mark Important");

    fireEvent.change(titleInput, {
      target: { value: "New Announcement Title" },
    });
    fireEvent.change(contentTextarea, {
      target: { value: "This is the content of the announcement." },
    });
    fireEvent.click(toggleButton);
    fireEvent.click(resetButton);
  });

  it("should throw an error if used outside provider", () => {
    expect(() => {
      renderWithProviders(<TestComponent />);
    }).toThrow(
      "useAnnouncementForm must be used within an AnnouncementFormProvider"
    );
  });
});
