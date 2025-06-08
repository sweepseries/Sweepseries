import styled from "styled-components";

import { type InquiryThreadDetailType } from "@entities/inquiries";
import { formatTimeSince } from "@shared/lib/datetime";

interface Props {
  inquiry: InquiryThreadDetailType;
}

export function InquiryNotes({ inquiry }: Readonly<Props>) {
  return (
    <NotesWrapper>
      <span>문의 관리자 노트</span>
      {inquiry.notes.length === 0 && <div>등록된 노트가 없습니다.</div>}
      {inquiry.notes.map((note) => (
        <div key={note.id}>
          <strong>{note.admin.name}</strong> (
          {formatTimeSince(new Date(note.created_at))}): {note.content}
        </div>
      ))}
    </NotesWrapper>
  );
}

const NotesWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;

  span {
    padding: 0 0.25rem;
    font-size: 1rem;
    font-weight: 500;
  }

  > div {
    font-size: 0.875rem;
    font-weight: 500;
    word-break: break-word;
    white-space: pre-wrap;
  }
`;
