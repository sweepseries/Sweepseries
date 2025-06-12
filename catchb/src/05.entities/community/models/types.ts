export type CommunityTagType = {
  id: number;
  name: string;
  icon: boolean;
};

export type CommunityForumSimpleType = {
  id: number;
  name: string;
};

export type CommunityForumType = {
  tags: CommunityTagType[];
} & CommunityForumSimpleType;

export type CommunityProfileType = {
  id: string; // UUID 형식의 문자열
  name: string;
  profile_image: string;
  color: string;
};

export type CommunityInitializerResponseType = {
  forums: CommunityForumType[];
  profiles: CommunityProfileType[];
};
