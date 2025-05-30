import { Outlet, useMatch, useNavigate } from "react-router";
import styled from "styled-components";

import { AnnouncementsListPage } from "./AnnouncementsList/AnnouncementsListPage";
import { LargeModal } from "@widgets/layouts/modals";

export function AnnouncementsManagementLayout() {
  const matchCreate = useMatch("/announcements/create");
  const matchDetail = useMatch("/announcements/:id");
  const isModalOpen = Boolean(matchCreate || matchDetail);
  const navigate = useNavigate();

  const closeModal = () => navigate("/announcements");

  return (
    <Container>
      <AnnouncementsListPage />
      <LargeModal isOpen={isModalOpen} onClose={closeModal}>
        <Outlet />
      </LargeModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100dvh;
`;
