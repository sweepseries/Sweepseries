import styled from "styled-components";

import { useTermDetails } from "../hooks/useTermDetails";

export function TermContents() {
  const { termDetails, selectedVersionId } = useTermDetails();

  if (!termDetails || selectedVersionId === -1) return null;

  return (
    <>
      {termDetails.versions[selectedVersionId].has_content ? (
        <Wrapper
          dangerouslySetInnerHTML={{
            __html: termDetails.versions[selectedVersionId].content,
          }}
        />
      ) : (
        <span>내용 없음</span>
      )}
    </>
  );
}

const Wrapper = styled.div`
  font-size: 1rem;
  line-height: 1.5;

  overflow-y: auto;
  word-break: break-word;
  white-space: pre-wrap;
`;
