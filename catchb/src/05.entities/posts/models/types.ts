import { ImagePickerAsset } from "expo-image-picker";

import type {
  CommunityForumSimpleType,
  CommunityProfileType,
  CommunityTagType,
} from "@entities/community/@x/post";

export type PostSimpleType = {
  id: number;
  author: CommunityProfileType;
  tag: CommunityTagType;
  title: string;
  content: string;
  image: string | null;
  num_views: number;
  num_comments: number;
  num_likes: number;
  created_at: string;
  is_updated: boolean;
};

export type PostListResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostSimpleType[];
  num_pages: number;
  current_page: number;
};

export type PostDetailType = {
  id: number;
  forum: CommunityForumSimpleType;
  author: CommunityProfileType;
  tag: CommunityTagType;
  title: string;
  content: string;
  images: PostImageType[];
  num_views: number;
  num_comments: number;
  num_likes: number;
  is_liked: boolean;
  created_at: string;
};

export type PostImageType = {
  id: number;
  image: string;
};

export type PostCreateType = {
  forum_id: number;
  author_id: string;
  tag_id: number;
  title: string;
  content: string;
  image_files: ImagePickerAsset[];
};
