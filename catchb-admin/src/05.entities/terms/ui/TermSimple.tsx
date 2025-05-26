import styled from "styled-components";

import type { AdminTermsAndConditionsType } from "../models/types";

export function TermListHeaderRow() {
  return (
    <HeaderRow>
      <SmallColumn>순번</SmallColumn>
      <TitleColumn>약관 제목</TitleColumn>
      <SmallColumn>유효성</SmallColumn>
      <SmallColumn>필수</SmallColumn>
      <DateColumn>생성일</DateColumn>
      <DateColumn>수정일</DateColumn>
    </HeaderRow>
  );
}

interface Props {
  term: AdminTermsAndConditionsType;
}

export function TermListRow({ term }: Readonly<Props>) {
  return (
    <TermRow>
      <SmallColumn>{term.order}</SmallColumn>
      <TitleColumn>{term.title}</TitleColumn>
      <SmallColumn>{term.is_active ? "유효" : "무효"}</SmallColumn>
      <SmallColumn>{term.is_required ? "필수" : "선택"}</SmallColumn>
      <DateColumn>{new Date(term.created_at).toLocaleDateString()}</DateColumn>
      <DateColumn>{new Date(term.updated_at).toLocaleDateString()}</DateColumn>
    </TermRow>
  );
}

const TermRow = styled.div`
  display: flex;
  align-items: center;

  font-size: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};

  > div:last-child {
    border-right: none;
  }
`;

const HeaderRow = styled(TermRow)`
  font-size: 18px;
  font-weight: bold;

  border-top: none;

  > div:nth-child(2) {
    justify-content: center;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  height: 36px;

  color: ${({ theme }) => theme.colors.text700};
  border-right: 1px solid ${({ theme }) => theme.colors.gray700};

  white-space: nowrap;
  overflow: hidden;
`;

const SmallColumn = styled(Content)`
  width: 60px;
`;

const TitleColumn = styled(Content)`
  flex: 1;
  justify-content: flex-start;
  max-width: 400px;
  font-size: 18px;
`;

const DateColumn = styled(Content)`
  width: 120px;
`;
