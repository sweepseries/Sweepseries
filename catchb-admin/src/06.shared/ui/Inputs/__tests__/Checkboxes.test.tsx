import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { Checkbox } from "@shared/ui/Inputs";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Inputs");

describe("Checkbox", () => {
  it("renders Checkbox with default props", () => {
    const { getByTestId } = renderWithProviders(
      <Checkbox label="Test Checkbox" checked={false} onToggle={vi.fn()} />
    );

    fireEvent.click(getByTestId("checkbox-Test Checkbox"));
  });

  it("calls onToggle when clicked", () => {
    const onToggle = vi.fn();
    const { getByTestId } = renderWithProviders(
      <Checkbox label="Test Checkbox" checked={false} onToggle={onToggle} />
    );

    fireEvent.click(getByTestId("checkbox-Test Checkbox"));
    expect(onToggle).toHaveBeenCalled();
  });
});
