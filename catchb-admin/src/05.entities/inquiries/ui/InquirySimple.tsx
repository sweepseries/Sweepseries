import styled from "styled-components";

import type { InquiryThreadType } from "../models/types";
import { InquiryCategoryChip } from "./InquiryCategoryChip";
import { InquiryStatusChip } from "./InquiryStatusChip";
import { AnonymousUserProfile, UserProfile } from "@shared/lib/auth";

interface Props {
  inquiry: InquiryThreadType;
}

export function InquirySimple({ inquiry }: Readonly<Props>) {
  return (
    <InquiryRow>
      <IndexColumn>{inquiry.id}</IndexColumn>
      <TitleColumn>
        {inquiry.title}
        {inquiry.is_read ? null : <RedDot title="읽지 않음" />}
      </TitleColumn>
      <UserColumn>
        {"uuid" in inquiry.user ? (
          <UserProfile user={inquiry.user} />
        ) : (
          <AnonymousUserProfile user={inquiry.user} />
        )}
      </UserColumn>
      <ChipColumn>
        <InquiryCategoryChip category={inquiry.category} isActive />
      </ChipColumn>
      <ChipColumn>
        <InquiryStatusChip status={inquiry.status} isActive />
      </ChipColumn>
    </InquiryRow>
  );
}

const InquiryRow = styled.div`
  display: flex;
  align-items: center;

  font-size: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
`;

const TableData = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  height: 36px;

  color: ${({ theme }) => theme.colors.text700};
  border-left: 1px solid ${({ theme }) => theme.colors.gray700};
`;

const IndexColumn = styled(TableData)`
  width: 3rem;
  border-left: none;
`;

const TitleColumn = styled(TableData)`
  display: block;
  flex: 1;
  justify-content: flex-start;
  min-width: 0;
  max-width: 24rem;
  border-left: 1px solid ${({ theme }) => theme.colors.gray700};
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UserColumn = styled(TableData)`
  width: 7rem;
`;

const ChipColumn = styled(TableData)`
  width: 5rem;
`;

const RedDot = styled.span`
  display: inline-block;
  margin-left: 0.25rem;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: 50%;
`;
