import {
  CommunityContext,
  CommunityContextType,
} from "../contexts/useCommunity";
import {
  sampleCommunityProfiles,
  sampleCommunityForums,
} from "../models/testdata";

const defaultCommunityContext: CommunityContextType = {
  activeProfile: sampleCommunityProfiles[0],
  switchProfile: jest.fn(),
  profiles: sampleCommunityProfiles,
  forums: sampleCommunityForums,
  activeForum: sampleCommunityForums[0],
  setActiveForum: jest.fn(),
};

interface Props {
  children: React.ReactNode;
  override?: Partial<CommunityContextType>;
}

export function CommunityTestWrapper({
  children,
  override = {},
}: Readonly<Props>) {
  return (
    <CommunityContext.Provider
      value={{ ...defaultCommunityContext, ...override }}
    >
      {children}
    </CommunityContext.Provider>
  );
}
