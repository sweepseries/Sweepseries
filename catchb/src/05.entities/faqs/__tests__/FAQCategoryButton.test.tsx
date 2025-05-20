import { FAQCategoryButton } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

describe("FAQCategoryButton", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <FAQCategoryButton
          category="general"
          onPress={jest.fn()}
          isSelected={true}
        />
        <FAQCategoryButton
          category="technical"
          onPress={jest.fn()}
          isSelected={false}
        />
      </>
    );
  });
});
