import { ImagePickerAsset } from "expo-image-picker";

import type {
  CommunityForumSimpleType,
  CommunityProfileType,
  CommunityTagType,
} from "@entities/community/@x/post";

export type PostType = {
  id: number;
};

export type PostDetailType = {
  id: number;
  forum: CommunityForumSimpleType;
  author: CommunityProfileType;
  tag: CommunityTagType;
  title: string;
  content: string;
  images: PostImageType[];
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
