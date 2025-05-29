/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { Editor } from "@tiptap/react";

import { EditorToolbar } from "@shared/ui/Inputs";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Inputs");

describe("EditorToolbar", () => {
  it("renders toolbar with buttons", () => {
    const mockFn = vi.fn(() => ({ run: vi.fn() }));
    const mockFocus = vi.fn(() => ({
      toggleBold: mockFn,
      toggleItalic: mockFn,
      toggleStrike: mockFn,
      setParagraph: mockFn,
      toggleHeading: mockFn,
      toggleBulletList: mockFn,
      toggleOrderedList: mockFn,
      undo: mockFn,
      redo: mockFn,
    }));

    const mockEditor = {
      isActive: vi.fn().mockReturnValue(true),
      chain: vi.fn(() => ({
        focus: mockFocus,
      })),
    } as any as Editor;

    const { getByTestId } = renderWithProviders(
      <EditorToolbar editor={mockEditor} />
    );

    fireEvent.click(getByTestId("toolbar-bold"));
    fireEvent.click(getByTestId("toolbar-italic"));
    fireEvent.click(getByTestId("toolbar-strikethrough"));
    fireEvent.click(getByTestId("toolbar-paragraph"));
    fireEvent.click(getByTestId("toolbar-heading-1"));
    fireEvent.click(getByTestId("toolbar-heading-2"));
    fireEvent.click(getByTestId("toolbar-heading-3"));
    fireEvent.click(getByTestId("toolbar-bullet-list"));
    fireEvent.click(getByTestId("toolbar-ordered-list"));
    fireEvent.click(getByTestId("toolbar-undo"));
    fireEvent.click(getByTestId("toolbar-redo"));
  });
});
