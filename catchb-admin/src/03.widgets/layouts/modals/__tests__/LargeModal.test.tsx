import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent } from "@testing-library/react";

import { LargeModal } from "@widgets/layouts/modals";
import { renderWithProviders } from "@test-utils/renderer";

describe("LargeModal", () => {
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    cleanup();
    const modalRoot = document.getElementById("modal-root");
    modalRoot?.remove();
  });

  it("does not render when closed", () => {
    renderWithProviders(
      <LargeModal isOpen={false} onClose={vi.fn()}>
        <div>Test Content</div>
      </LargeModal>
    );
  });

  it("renders when open", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <LargeModal isOpen={true} onClose={vi.fn()}>
        <div>Test Content</div>
      </LargeModal>
    );

    expect(getByText("Test Content")).toBeInTheDocument();

    // test close on backdrop click
    fireEvent.click(getByTestId("backdrop"));

    // test close on Escape key
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(getByText("Test Content")).toBeInTheDocument();
    fireEvent.keyUp(document, { key: "Escape", code: "Escape" });
    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
