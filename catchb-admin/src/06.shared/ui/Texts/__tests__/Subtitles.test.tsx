import { describe, it, vi } from "vitest";

import { ModalSubtitle } from "@shared/ui/Texts";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Texts");

describe("ModalSubtitle", () => {
  it("renders correctly", () => {
    renderWithProviders(<ModalSubtitle>Test Subtitle</ModalSubtitle>);
  });
});
