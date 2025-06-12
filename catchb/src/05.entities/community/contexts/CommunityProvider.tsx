import { useEffect, useMemo, useState } from "react";

import { initializeCommunity } from "../api/initialize";
import { CommunityContextType, CommunityContext } from "./useCommunity";
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
  const [activeForum, setActiveForum] = useState<CommunityForumType>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const { showAlert } = useAlert();

  const switchProfile = (newProfile: CommunityProfileType) => {
    setActiveProfile(newProfile);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const res = await initializeCommunity();

      const storedActiveProfileId = await getStorage("activeProfileId");

      if (res) {
        if (res.forums.length === 0 || res.profiles.length === 0) {
          showAlert({
            title: "데이터 로드 실패",
            message:
              "오류가 발생했습니다. 관리자에게 문의해주세요.",
          });
          return;
        }

        setForums(res.forums);
        setActiveForum(res.forums[0] || null);

        setProfiles(res.profiles);
        const initialProfile =
          res.profiles.find(
            (profile) => profile.id === storedActiveProfileId
          ) ?? res.profiles[0];
        setActiveProfile(initialProfile);

        setIsInitialized(true);
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
      activeForum: activeForum!,
      setActiveForum: setActiveForum,
    }),
    [activeProfile, profiles, forums, activeForum]
  );

  if (!isInitialized || !activeProfile) {
    return null;
  }

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}
