import styled from "styled-components";

import { useInquiryDetails } from "../hooks/useInquiryDetails";
import {
  InquiryMessage,
  type InquiryThreadDetailType,
} from "@entities/inquiries";
import { TextButton } from "@shared/ui/Buttons";

interface Props {
  inquiry: InquiryThreadDetailType;
}

export function InquiryConversation({ inquiry }: Readonly<Props>) {
  const { mode, toggleMode } = useInquiryDetails();

  return (
    <Wrapper>
      <Chatroom>
        {inquiry.messages.map((message) => (
          <InquiryMessage key={message.id} message={message} />
        ))}
      </Chatroom>
      {mode === "노트" && (
        <TextButton text="답변 작성하기" onClick={toggleMode} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;
`;

const Chatroom = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;
