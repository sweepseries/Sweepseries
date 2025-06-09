import { useEffect, useMemo, useState } from "react";

import {
  CommunityProfileContext,
  type CommunityProfileContextType,
} from "../models/contexts";
import { sampleCommunityProfiles } from "../models/testdata";
import type { CommunityProfileType } from "../models/types";

export function CommunityProfilesProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, setProfile] = useState<CommunityProfileType | null>(null);
  const [profiles, setProfiles] = useState<CommunityProfileType[]>([]);

  const switchProfile = (newProfile: CommunityProfileType) => {
    setProfile(newProfile);
  };

  useEffect(() => {
    // TODO: Fetch profiles from an API or database
    setProfiles(sampleCommunityProfiles);
    setProfile(sampleCommunityProfiles[0]);
  }, []);

  const value = useMemo<CommunityProfileContextType>(
    () => ({
      activeProfile: profile,
      switchProfile,
      profiles,
    }),
    [profile, profiles]
  );

  return (
    <CommunityProfileContext.Provider value={value}>
      {children}
    </CommunityProfileContext.Provider>
  );
}
