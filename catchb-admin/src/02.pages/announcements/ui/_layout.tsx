import { Outlet, useMatch, useNavigate } from "react-router";
import styled from "styled-components";

import { AnnouncementsListPage } from "./AnnouncementsList/AnnouncementsListPage";
import { Modal } from "@widgets/layouts/modals";

export function AnnouncementsManagementLayout() {
  const matchCreate = useMatch("/announcements/create");
  const matchDetail = useMatch("/announcements/:id");
  const matchEdit = useMatch("/announcements/:id/edit");
  const isModalOpen = Boolean(matchCreate ?? matchDetail ?? matchEdit);
  const navigate = useNavigate();

  const closeModal = () => navigate("/announcements");

  return (
    <Container>
      <AnnouncementsListPage />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Outlet />
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100dvh;
`;
