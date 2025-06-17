import { PostDetailType, PostSimpleType, PostListResponseType } from "./types";

export const samplePostDetail: PostDetailType = {
  id: 1,
  forum: {
    id: 1,
    name: "덕아웃",
  },
  author: {
    id: "1",
    name: "홍길동",
    profile_image: "",
    color: "#FF5733",
  },
  tag: {
    id: 1,
    name: "샘플 태그",
    icon: true,
  },
  title: "샘플 게시글 제목",
  content: "샘플 게시글 내용입니다. 이곳에 게시글의 내용을 작성합니다.",
  images: [{ id: 1, image: "https://placehold.co/400" }],
  num_views: 100,
  num_comments: 10,
  num_likes: 5,
  is_liked: false,
  created_at: "2023-10-01T12:00:00Z",
};

export const samplePostSimple: PostSimpleType = {
  id: 1,
  author: {
    id: "1",
    name: "홍길동",
    profile_image: "",
    color: "#FF5733",
  },
  tag: {
    id: 1,
    name: "샘플 태그",
    icon: true,
  },
  title: "샘플 게시글 제목",
  content: "샘플 게시글 내용입니다. 이곳에 게시글의 내용을 작성합니다.",
  image: "https://placehold.co/400",
  num_views: 100,
  num_comments: 10,
  num_likes: 5,
  created_at: "2023-10-01T12:00:00Z",
  is_updated: false,
};

export const samplePostListResponse: PostListResponseType = {
  count: 1,
  next: null,
  previous: null,
  results: [samplePostSimple, { ...samplePostSimple, id: 2 }],
  num_pages: 1,
  current_page: 1,
};
