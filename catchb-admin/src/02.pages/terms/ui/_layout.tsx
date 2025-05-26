import { Outlet, useMatch, useNavigate } from "react-router";
import styled from "styled-components";

import { TermsListPage } from "./TermsList/TermsListPage";
import { LargeModal } from "@widgets/layouts/modals";

export function TermsManagementLayout() {
  const matchCreate = useMatch("/terms/create");
  const matchDetail = useMatch("/terms/:id");
  const isModalOpen = Boolean(matchCreate || matchDetail);
  const navigate = useNavigate();

  const closeModal = () => navigate("/terms");

  return (
    <Container>
      <TermsListPage />
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
