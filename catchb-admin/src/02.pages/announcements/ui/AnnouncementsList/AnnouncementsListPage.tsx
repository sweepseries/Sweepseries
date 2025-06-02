import styled from "styled-components";

import { AnnouncementsListLoading } from "./_loading";
import { PageTitle } from "@widgets/layouts/title";
import {
  AnnouncementsHeader,
  AnnouncementsListProvider,
  AnnouncementsTableHeader,
  AnnouncementTableContents,
  useAnnouncementsList,
} from "@features/announcements/list-announcements";

export function AnnouncementsListPage() {
  return (
    <AnnouncementsListProvider>
      <Components />
    </AnnouncementsListProvider>
  );
}

function Components() {
  const { isLoading } = useAnnouncementsList();

  return (
    <Container>
      <PageTitle>Catch B 공지 관리</PageTitle>
      <AnnouncementsHeader />
      <TableWrapper>
        <AnnouncementsTableHeader />
        {isLoading ? (
          <AnnouncementsListLoading />
        ) : (
          <AnnouncementTableContents />
        )}
      </TableWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;
