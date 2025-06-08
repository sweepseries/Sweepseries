import styled from "styled-components";

import type { InquiryThreadDetailType } from "../models/types";
import { ProfileImage } from "@shared/lib/auth";
import { formatTimeSince } from "@shared/lib/datetime";

interface Props {
  inquiry: InquiryThreadDetailType;
}

export function InquiryDetailMetadata({ inquiry }: Readonly<Props>) {
  return (
    <Wrapper>
      <ProfileImage user={inquiry.user} size={28} />
      <span>{inquiry.user.name}</span>
      <span>{formatTimeSince(new Date(inquiry.created_at))}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  > span:last-child {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text500};
  }
`;
