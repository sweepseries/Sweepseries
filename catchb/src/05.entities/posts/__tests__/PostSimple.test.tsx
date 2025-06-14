import { PostSimple, samplePostSimple } from "@entities/posts";
import { renderWithProviders } from "@test-utils/renderer";

describe("PostSimple", () => {
  it("renders post with image and * for updated", () => {
    const { getByText } = renderWithProviders(
      <PostSimple post={{ ...samplePostSimple, is_updated: true }} />
    );

    expect(getByText(samplePostSimple.title)).toBeTruthy();
    expect(getByText(samplePostSimple.content)).toBeTruthy();
    expect(getByText(samplePostSimple.author.name)).toBeTruthy();
  });

  it("renders post without image", () => {
    renderWithProviders(
      <PostSimple
        post={{
          ...samplePostSimple,
          image: null,
        }}
      />
    );
  });
});
