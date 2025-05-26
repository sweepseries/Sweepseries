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
    document.getElementById("modal-root")?.remove();
  });

  it("does not render when closed", () => {
    const { queryByText, queryByTestId } = renderWithProviders(
      <LargeModal isOpen={false} onClose={vi.fn()}>
        <div>Test Content</div>
      </LargeModal>
    );

    expect(queryByText("Test Content")).toBeNull();
    expect(queryByTestId("backdrop")).toBeNull();
    expect(queryByTestId("modal-container")).toBeNull();
  });

  it("renders when open", async () => {
    const onClose = vi.fn();

    const { getByTestId, getByText } = renderWithProviders(
      <LargeModal isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </LargeModal>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
    expect(getByTestId("backdrop")).toBeInTheDocument();
    expect(getByTestId("modal-container")).toBeInTheDocument();

    // test close on backdrop click
    fireEvent.click(getByTestId("backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);

    // test close on Escape key
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(getByText("Test Content")).toBeInTheDocument();
    fireEvent.keyUp(document, { key: "Escape", code: "Escape" });
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("handles closing animation", async () => {
    const onClose = vi.fn();

    const { rerender, getByTestId } = renderWithProviders(
      <LargeModal isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </LargeModal>
    );
    
    rerender(
      <LargeModal isOpen={false} onClose={onClose}>
        <div>Test Content</div>
      </LargeModal>
    );

    // Simulate animation end
    fireEvent.animationEnd(getByTestId("modal-container"));
  });
});
