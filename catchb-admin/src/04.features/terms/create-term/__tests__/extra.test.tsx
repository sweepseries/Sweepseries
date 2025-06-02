import { describe, it, vi } from "vitest";
import * as TipTap from "@tiptap/react";

import { CreateTermFormRight, CreateTermProvider } from "@features/terms/create-term";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("@tiptap/react");

describe("CreateTermFormRight", () => {
  it("renders editor with initial content", () => {
    vi.spyOn(TipTap, "useEditor").mockImplementation(() => null);

    renderWithProviders(
      <CreateTermProvider>
        <CreateTermFormRight />
      </CreateTermProvider>
    );
  });
});
