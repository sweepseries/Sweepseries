import { createContext } from "react";

import { CommunityForumType, CommunityProfileType } from "@entities/community";

export interface CommunityContextType {
  // 유저가 활동하는 프로필
  activeProfile: CommunityProfileType | null;
  switchProfile: (profile: CommunityProfileType) => void;
  profiles: CommunityProfileType[];
  // 커뮤니티 포럼 관련
  forums: CommunityForumType[];
  activeForum: CommunityForumType | null;
  setActiveForum: (forum: CommunityForumType) => void;
}

export const CommunityContext = createContext<CommunityContextType | undefined>(
  undefined
);
