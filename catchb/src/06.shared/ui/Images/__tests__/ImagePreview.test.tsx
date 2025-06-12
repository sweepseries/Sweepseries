import { ImagePreview } from "@shared/ui/Images";
import { renderWithProviders } from "@test-utils/renderer";

describe("ImagePreview", () => {
  it("renders correctly with default props", () => {
    renderWithProviders(
      <ImagePreview
        imageUrl="https://example.com/image.jpg"
        onRemove={jest.fn()}
      />
    );
  });

  it("renders with custom size", () => {
    renderWithProviders(
      <ImagePreview
        imageUrl="https://example.com/image.jpg"
        onRemove={jest.fn()}
        size={150}
      />
    );
  });
});
