import { describe, it } from "vitest";

import { FAQSimple, sampleFAQs } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

describe("FAQSimple", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <FAQSimple faq={sampleFAQs[0]} />
        <FAQSimple faq={sampleFAQs[1]} />
        <FAQSimple faq={sampleFAQs[2]} />
      </>
    );
  });
});
