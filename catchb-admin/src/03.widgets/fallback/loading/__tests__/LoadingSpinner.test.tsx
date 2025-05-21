import { describe, it } from "vitest";

import { LoadingSpinner } from "@widgets/fallback/loading";
import { renderWithProviders } from "@test-utils/renderer";

describe("LoadingSpinner", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingSpinner />);
  });
});
