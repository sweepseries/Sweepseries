import styled from "styled-components";

import { useTermDetails } from "../hooks/useTermDetails";
import { ModalSubtitle } from "@shared/ui/Texts";

export function TermVersions() {
  const { termDetails, selectedVersionId, setSelectedVersionId } =
    useTermDetails();

  if (!termDetails || selectedVersionId === -1) return null;

  const versionsArray = Object.values(termDetails.versions).sort((a, b) => {
    return b.id - a.id; // 최신 버전이 위에 오도록 정렬
  });

  return (
    <List>
      <ModalSubtitle>약관 업데이트 내역</ModalSubtitle>
      {versionsArray.map((version) => (
        <VersionItem
          key={version.id}
          $isSelected={selectedVersionId === version.id}
          onClick={() => setSelectedVersionId(version.id)}
          data-testid={`version-item-${version.id}`}
        >
          <span>{version.created_at}</span>
          <span>{version.update_summary}</span>
        </VersionItem>
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
  gap: 0.5rem;
`;

const VersionItem = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.background300};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.onPrimary : theme.colors.text300};
  cursor: pointer;

  > span:first-child {
    font-size: 0.875rem;
  }

  > span:last-child {
    flex: 1;
    font-size: 1rem;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
