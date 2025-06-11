import {
  CommunityForumType,
  CommunityProfileType,
  CommunityInitializerResponseType,
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

export const sampleCommunityForums: CommunityForumType[] = [
  {
    id: 1,
    name: "덕아웃",
    tags: [
      {
        id: 1,
        name: "KBO",
        color: "#FF5733",
        background_color: "#FFE5D9",
        icon: "kbo",
      },
    ],
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
