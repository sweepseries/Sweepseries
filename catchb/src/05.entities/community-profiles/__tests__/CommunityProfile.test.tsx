import {
  CommunityProfile,
  sampleCommunityProfiles,
} from "@entities/community-profiles";
import { renderWithProviders } from "@test-utils/renderer";

describe("CommunityProfile", () => {
  it("renders all cases correctly", () => {
    renderWithProviders(
      <>
        <CommunityProfile profile={null} />
        <CommunityProfile profile={sampleCommunityProfiles[0]} />
        <CommunityProfile profile={sampleCommunityProfiles[1]} />
      </>
    );
  });
});
