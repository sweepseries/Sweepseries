import styled from "styled-components";

import { TermDetailsLoading } from "./_loading";
import {
  ModalInnerContainer,
  ModalContentHorizontal,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import { DeleteTermButton } from "@features/terms/delete-term";
import { TermContentEditor } from "@features/terms/edit-term-content";
import { ReactivateTermButton } from "@features/terms/reactivate-term";
import {
  TermContents,
  TermContentsWrapper,
  TermDetailsProvider,
  TermVersions,
  useTermDetails,
} from "@features/terms/term-details";
import { VerticalDivider } from "@shared/ui/Dividers";

export function TermsDetailPanel() {
  return (
    <TermDetailsProvider>
      <Components />
    </TermDetailsProvider>
  );
}

function Components() {
  const { termDetails, editMode, setEditMode, selectedVersionId, isLoading } =
    useTermDetails();

  if (isLoading) {
    return <TermDetailsLoading />;
  }

  if (!termDetails) return null;

  const toggleEditMode = () => setEditMode(!editMode);

  return (
    <Container>
      <Header>
        <ModalTitle>
          약관 내용 - ({termDetails.is_required ? "필수" : "선택"}){" "}
          {termDetails.title}
        </ModalTitle>
        {termDetails.is_active ? (
          <DeleteTermButton termId={termDetails.id} />
        ) : (
          <ReactivateTermButton termId={termDetails.id} />
        )}
      </Header>
      <ModalContentHorizontal>
        <TermVersions />
        <div>
          <VerticalDivider />
        </div>
        <TermContentsWrapper termDetails={termDetails}>
          {editMode ? (
            <TermContentEditor
              termId={termDetails.id}
              versionId={selectedVersionId}
              content={termDetails.versions[selectedVersionId].content}
              postSuccess={toggleEditMode}
            />
          ) : (
            <TermContents />
          )}
        </TermContentsWrapper>
      </ModalContentHorizontal>
    </Container>
  );
}

const Container = styled(ModalInnerContainer)`
  gap: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1.25rem;
`;
