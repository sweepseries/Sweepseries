import styled from "styled-components";

import { useTermDetails } from "../hooks/useTermDetails";
import { ModalSubtitle } from "@shared/ui/Texts";

export function TermContents() {
  const { termDetails, selectedVersionId } = useTermDetails();

  if (!termDetails || selectedVersionId === -1) return null;

  return (
    <Contents>
      <ModalSubtitle>약관 내용</ModalSubtitle>
      <div
        dangerouslySetInnerHTML={{
          __html: termDetails.versions[selectedVersionId].content,
        }}
      />
    </Contents>
  );
}

const Contents = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;
  padding: 0 1rem;
  gap: 0.5rem;

  font-size: 1rem;
  line-height: 1.25;
`;
