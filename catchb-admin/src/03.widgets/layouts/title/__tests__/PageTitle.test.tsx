import { describe, it } from "vitest";

import { PageTitle } from "@widgets/layouts/title";
import { renderWithProviders } from "@test-utils/renderer";

describe("PageTitle", () => {
  it("renders correctly", () => {
    renderWithProviders(<PageTitle>Test Title</PageTitle>);
  });
});
