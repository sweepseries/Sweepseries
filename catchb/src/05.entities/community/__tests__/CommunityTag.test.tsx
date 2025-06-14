import { CommunityChipTag, CommunityTagType } from "@entities/community";
import { renderWithProviders } from "@test-utils/renderer";

describe("CommunityChipTag Component", () => {
  it("renders all types of tags", () => {
    const tagWithIcon: CommunityTagType = {
      id: 1,
      name: "iconTag",
      icon: true,
    };
    const tagWithoutIcon: CommunityTagType = {
      id: 2,
      name: "textTag",
      icon: false,
    };

    renderWithProviders(
      <>
        <CommunityChipTag tag={tagWithIcon} active={true} />
        <CommunityChipTag tag={tagWithIcon} />
        <CommunityChipTag tag={tagWithoutIcon} active={true} />
        <CommunityChipTag tag={tagWithoutIcon} />
      </>
    );
  });
});
