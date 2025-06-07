import styled from "styled-components";

import type { InquiryMessageType } from "../models/types";
import {
  ProfileImage,
  type AnonymousUserType,
  type UserProfileType,
} from "@shared/lib/auth";
import { formatTimeSince } from "@shared/lib/datetime";

interface Props {
  user: AnonymousUserType | UserProfileType;
  message: InquiryMessageType;
}

export function InquiryMessage({ user, message }: Readonly<Props>) {
  if (message.sender === "사용자") {
    return (
      <Left>
        <ProfileImage user={user} />
        <div>{message.content}</div>
        <span>{formatTimeSince(new Date(message.created_at))}</span>
      </Left>
    );
  }

  if (message.sender === "관리자") {
    return (
      <Right>
        {message.content}
        <span>{formatTimeSince(new Date(message.created_at))}</span>
      </Right>
    );
  }

  return <Center>{message.content}</Center>;
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
    border-radius: 0.5rem 0.5rem 0.5rem 0;
    background-color: ${({ theme }) => theme.colors.background300};
  }
`;

const Left = styled(Wrapper)`
  align-self: flex-start;
`;

const Right = styled(Wrapper)`
  align-self: flex-end;
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
