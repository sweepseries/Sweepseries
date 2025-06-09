export type CommunityForumType = {
  id: number;
  name: string;
};

export type CommunityTagType = {
  id: number;
  forum: CommunityForumType;
  name: string;
  icon: string;
  color: string;
  background_color: string;
};

export type PostType = {
  id: number;
};
