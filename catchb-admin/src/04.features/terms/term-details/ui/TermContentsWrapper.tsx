import styled from "styled-components";

import { useTermDetails } from "../hooks/useTermDetails";
import type { AdminTermsAndConditionsDetailType } from "@entities/terms";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";
import { ModalSubtitle } from "@shared/ui/Texts";

interface Props {
  termDetails: AdminTermsAndConditionsDetailType;
  children: React.ReactNode;
}

export function TermContentsWrapper({
  termDetails,
  children,
}: Readonly<Props>) {
  const { selectedVersionId, editMode, setEditMode } = useTermDetails();
  const { colors } = useColors();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <ContentWrapper>
      <SubHeader>
        <ModalSubtitle>약관 내용</ModalSubtitle>
        {termDetails.latest_version_id === selectedVersionId && (
          <button
            onClick={toggleEditMode}
            data-testid="edit-term-content-button"
          >
            {editMode ? (
              <AppIcon icon="close" size={14} color={colors.text500} />
            ) : (
              <AppIcon icon="pencil" size={14} color={colors.text500} />
            )}
            {editMode ? <span>취소</span> : <span>내용 수정</span>}
          </button>
        )}
      </SubHeader>
      {children}
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;

  font-size: 1rem;
  line-height: 1.25;

  > span:last-child {
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > button {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text500};
  }
`;
