import { describe, it } from "vitest";

import { ModalTitle } from "@widgets/layouts/title";
import { renderWithProviders } from "@test-utils/renderer";

describe("ModalTitle", () => {
  it("renders correctly", () => {
    renderWithProviders(<ModalTitle>Test Modal Title</ModalTitle>);
  });
});
