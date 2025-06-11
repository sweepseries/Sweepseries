import {
  CommunityForumType,
  CommunityProfileType,
  CommunityInitializerResponseType,
  CommunityTagType,
} from "./types";

export const sampleCommunityProfiles: CommunityProfileType[] = [
  {
    id: "1",
    name: "Default Profile",
    profile_image: "",
    color: "#FF5733",
  },
  {
    id: "2",
    name: "Profile One",
    profile_image: "https://placehold.co/400",
    color: "#33FF57",
  },
];

const sampleDugoutTags: CommunityTagType[] = [
  {
    id: 1,
    name: "KBO",
    icon: true,
  },
  {
    id: 2,
    name: "MLB",
    icon: true,
  },
];

export const sampleCommunityTags: CommunityTagType[] = sampleDugoutTags;

export const sampleCommunityForums: CommunityForumType[] = [
  {
    id: 1,
    name: "덕아웃",
    tags: sampleDugoutTags,
  },
  {
    id: 2,
    name: "드래프트",
    tags: [],
  },
  {
    id: 3,
    name: "마켓",
    tags: [],
  },
];

export const sampleCommunityInitializerResponse: CommunityInitializerResponseType =
  {
    forums: sampleCommunityForums,
    profiles: sampleCommunityProfiles,
  };
