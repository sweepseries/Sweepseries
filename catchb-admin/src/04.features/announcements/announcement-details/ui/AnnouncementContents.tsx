import type { AdminCatchBAnnouncementDetailType } from "@entities/announcements";
import styled from "styled-components";

interface Props {
  announcement: AdminCatchBAnnouncementDetailType;
}

export function AnnouncementContents({ announcement }: Readonly<Props>) {
  return <Contents>{announcement.content || "내용 없음"}</Contents>;
}

const Contents = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;

  font-size: 1rem;
  line-height: 1.5;

  overflow-y: auto;
  word-break: break-word;
  white-space: pre-wrap;
`;
