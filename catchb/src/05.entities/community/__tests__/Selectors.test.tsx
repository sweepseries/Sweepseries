import {
  ForumSelect,
  TagSelect,
  sampleCommunityForums,
  sampleCommunityTags,
} from "@entities/community";
import { renderWithProviders } from "@test-utils/renderer";

describe("Community Selectors", () => {
  it("renders ForumSelect with options", () => {
    renderWithProviders(
      <ForumSelect
        options={sampleCommunityForums}
        selectedForum={sampleCommunityForums[0]}
        onSelect={jest.fn()}
      />
    );
  });

  it("renders TagSelect with options", () => {
    renderWithProviders(
      <TagSelect
        options={sampleCommunityTags}
        selectedTag={sampleCommunityTags[0]}
        onSelect={jest.fn()}
      />
    );
  });
});
