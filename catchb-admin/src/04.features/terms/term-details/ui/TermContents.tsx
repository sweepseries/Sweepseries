import styled from "styled-components";

import { useTermDetails } from "../hooks/useTermDetails";
import { ModalSubtitle } from "@shared/ui/Texts";

export function TermContents() {
  const { termDetails, selectedVersionId } = useTermDetails();

  if (!termDetails || selectedVersionId === -1) return null;

  return (
    <Contents>
      <ModalSubtitle>약관 내용</ModalSubtitle>
      {termDetails.versions[selectedVersionId].content ? (
        <div
          dangerouslySetInnerHTML={{
            __html: termDetails.versions[selectedVersionId].content,
          }}
        />
      ) : (
        <span>내용 없음</span>
      )}
    </Contents>
  );
}

const Contents = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;

  font-size: 1rem;
  line-height: 1.25;

  > span:last-child {
    color: ${({ theme }) => theme.colors.gray900};
  }
`;
