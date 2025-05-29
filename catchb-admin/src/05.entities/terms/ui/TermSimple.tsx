import styled from "styled-components";

import type { AdminTermsAndConditionsType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

export function TermListHeaderRow() {
  return (
    <HeaderRow>
      <SmallColumn>순번</SmallColumn>
      <TitleColumn>약관 제목</TitleColumn>
      <SmallColumn>유효성</SmallColumn>
      <SmallColumn>필수</SmallColumn>
      <DateColumn>생성일</DateColumn>
      <DateColumn>수정일</DateColumn>
      <DateColumn>비고</DateColumn>
    </HeaderRow>
  );
}

interface Props {
  term: AdminTermsAndConditionsType;
}

export function TermListRow({ term }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <TermRow>
      <SmallColumn>{term.order}</SmallColumn>
      <TitleColumn>{term.title}</TitleColumn>
      <SmallColumn>
        {term.is_active ? (
          <TextChip label="유효" color={colors.success} />
        ) : (
          <TextChip label="무효" color={colors.gray900} />
        )}
      </SmallColumn>
      <SmallColumn>
        {term.is_required ? (
          <TextChip label="필수" color={colors.primary} />
        ) : (
          <TextChip label="선택" color={colors.gray900} />
        )}
      </SmallColumn>
      <DateColumn>{new Date(term.created_at).toLocaleDateString()}</DateColumn>
      <DateColumn>{new Date(term.updated_at).toLocaleDateString()}</DateColumn>
      <DateColumn>{term.has_content ? "" : "내용 없음"}</DateColumn>
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
