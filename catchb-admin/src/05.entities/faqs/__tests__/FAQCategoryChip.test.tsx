import { describe, it } from "vitest";

import { FAQCategoryChip, sampleFAQCategories } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

describe("FAQCategoryChip", () => {
  it("renders correctly", () => {
    renderWithProviders(<FAQCategoryChip category={sampleFAQCategories[0]} />);
  });
});
