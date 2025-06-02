import { describe, it, vi } from "vitest";

import { TextChip } from "@shared/ui/Chips";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Chips");

describe("TextChip", () => {
  it("renders with default styles", () => {
    renderWithProviders(<TextChip label="Default Chip" />);
  });

  it("renders with icon", () => {
    renderWithProviders(<TextChip label="Default Chip" icon="chevron-up" />);
  });
});
