import { useEffect, useMemo, useState } from "react";

import { initializeCommunity } from "../api/initialize";
import { CommunityContextType, CommunityContext } from "../models/contexts";
import { CommunityForumType, CommunityProfileType } from "@entities/community";
import { useAlert } from "@shared/lib/alert";
import { getStorage, saveStorage } from "@shared/lib/storage";

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

  const { showAlert } = useAlert();

  const switchProfile = (newProfile: CommunityProfileType) => {
    setActiveProfile(newProfile);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const res = await initializeCommunity();

      const storedActiveProfileId = await getStorage("activeProfileId");

      if (res) {
        setForums(res.forums);
        setActiveForum(res.forums[0] || null);

        setProfiles(res.profiles);
        const initialProfile =
          res.profiles.find(
            (profile) => profile.id === storedActiveProfileId
          ) ?? res.profiles[0];
        setActiveProfile(initialProfile);
      } else {
        showAlert({
          title: "커뮤니티 데이터 로드 실패",
          message:
            "커뮤니티 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.",
        });
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (activeProfile) {
      saveStorage("activeProfileId", activeProfile.id);
    }
  }, [activeProfile]);

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
