import { describe, it, vi } from "vitest";
import * as TipTap from "@tiptap/react";

import { TermContentEditor } from "@features/terms/edit-term-content";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("@tiptap/react");

describe("TermContentEditor", () => {
  it("renders editor with initial content", () => {
    vi.spyOn(TipTap, "useEditor").mockImplementation(() => null);

    renderWithProviders(
      <TermContentEditor
        termId={1}
        versionId={2}
        content="Initial content"
        postSuccess={vi.fn()}
      />
    );
  });
});
