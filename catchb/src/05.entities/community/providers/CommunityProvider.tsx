import { useEffect, useMemo, useState } from "react";

import { CommunityContextType, CommunityContext } from "../models/contexts";
import {
  sampleCommunityForums,
  sampleCommunityProfiles,
} from "../models/testdata";
import { CommunityForumType, CommunityProfileType } from "@entities/community";

export function CommunityProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeProfile, setActiveProfile] =
    useState<CommunityProfileType | null>(null);
  const [profiles, setProfiles] = useState<CommunityProfileType[]>([]);
  const [forums, setForums] = useState<CommunityForumType[]>([]);
  const [activeForum, setActiveForum] = useState<CommunityForumType | null>(
    null
  );

  const switchProfile = (newProfile: CommunityProfileType) => {
    setActiveProfile(newProfile);
  };

  useEffect(() => {
    // TODO: Fetch profiles from API or local storage
    setProfiles(sampleCommunityProfiles);
    setForums(sampleCommunityForums);
    setActiveForum(sampleCommunityForums[0]);
  }, []);

  const value = useMemo<CommunityContextType>(
    () => ({
      activeProfile,
      switchProfile,
      profiles,
      forums: forums,
      activeForum: activeForum,
      setActiveForum: setActiveForum,
    }),
    [activeProfile, profiles, forums, activeForum]
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}
