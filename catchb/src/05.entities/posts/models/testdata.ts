import { PostDetailType } from "./types";

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
};
