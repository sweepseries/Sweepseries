export type CommunityTagType = {
  id: number;
  name: string;
  icon: boolean;
};

export type CommunityForumType = {
  id: number;
  name: string;
  tags: CommunityTagType[];
};

export type CommunityProfileType = {
  id: string;
  name: string;
  profile_image: string;
  color: string;
};

export type CommunityInitializerResponseType = {
  forums: CommunityForumType[];
  profiles: CommunityProfileType[];
};
