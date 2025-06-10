import { CommunityForumType, CommunityProfileType } from "./types";

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
    name: "General Discussion",
    tags: [],
  },
  {
    id: 2,
    name: "Announcements",
    tags: [
      {
        id: 1,
        name: "Updates",
        icon: "📢",
        color: "#FFCC00",
        background_color: "#FFF3CD",
      },
    ],
  },
];
