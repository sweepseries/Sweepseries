import { sampleCommunityTags } from "@entities/community";
import { PostTag } from "@entities/posts";
import { renderWithProviders } from "@test-utils/renderer";

describe("PostTag Component", () => {
  it("should render with icon if available", () => {
    renderWithProviders(<PostTag tag={sampleCommunityTags[0]} />);
  });
});
