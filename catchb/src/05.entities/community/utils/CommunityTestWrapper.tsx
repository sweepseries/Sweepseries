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
  switchProfile: () => {},
  profiles: sampleCommunityProfiles,
  forums: sampleCommunityForums,
  activeForum: sampleCommunityForums[0],
  setActiveForum: () => {},
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
