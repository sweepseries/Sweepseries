import { FAQSimple, sampleFAQs } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

describe("FAQSimple", () => {
  it("renders collapsed correctly", () => {
    renderWithProviders(
      <FAQSimple faq={sampleFAQs[0]} onPress={jest.fn()} expanded={false} />
    );
  });

  it("renders expanded correctly", () => {
    renderWithProviders(
      <FAQSimple faq={sampleFAQs[0]} onPress={jest.fn()} expanded={true} />
    );
  });
});
