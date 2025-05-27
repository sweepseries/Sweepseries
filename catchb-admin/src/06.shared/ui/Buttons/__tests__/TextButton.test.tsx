import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { TextButton } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Buttons");

describe("TextButton", () => {
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    const { getByTestId } = renderWithProviders(
      <TextButton text="Click Me" onClick={onClick} />
    );

    fireEvent.click(getByTestId("text-button-Click Me"));
    expect(onClick).toHaveBeenCalled();
  });
});
