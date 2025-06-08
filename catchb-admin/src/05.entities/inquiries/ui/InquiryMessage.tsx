import styled from "styled-components";

import type { InquiryMessageType } from "../models/types";
import { ProfileImage } from "@shared/lib/auth";
import { formatTimeSince } from "@shared/lib/datetime";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  message: InquiryMessageType;
}

export function InquiryMessage({ message }: Readonly<Props>) {
  if (message.sender === "사용자") {
    return (
      <Left>
        <ProfileImage user={message.user} />
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
        <span>{formatTimeSince(new Date(message.created_at))}</span>
      </Left>
    );
  }

  if (message.sender === "관리자") {
    return (
      <Right>
        <span>{formatTimeSince(new Date(message.created_at))}</span>
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
        <IconWrapper>
          <AppIcon icon="admin" size={14} />
        </IconWrapper>
      </Right>
    );
  }

  return (
    <Center>
      {message.content} ({message.user.name})
    </Center>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.33rem;

  > span {
    padding: 0.125rem 0;
    font-size: 0.75rem;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    max-width: 70%;
    position: relative;

    font-size: 0.925rem;
    line-height: 1.25;
    color: ${({ theme }) => theme.colors.text900};

    overflow-y: auto;
    word-break: break-word;
    white-space: pre-wrap;

    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.background300};

    > p {
      margin: 0;
    }
  }
`;

const Left = styled(Wrapper)`
  align-self: flex-start;
  justify-content: flex-start;

  > div:nth-child(2) {
    border-radius: 0.5rem 0.5rem 0.5rem 0;
  }
`;

const Right = styled(Wrapper)`
  align-self: flex-end;
  justify-content: flex-end;

  > div:nth-child(2) {
    border-radius: 0.5rem 0.5rem 0 0.5rem;
  }
`;

const Center = styled(Wrapper)`
  justify-content: center;
  padding: 0.25rem 0;
  width: 100%;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text700};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray300};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray500};
`;
