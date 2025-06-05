import { Outlet, useMatch, useNavigate } from "react-router";
import styled from "styled-components";

import { InquiriesListPage } from "./InquiriesList/InquiriesListPage";
import { Modal } from "@widgets/layouts/modals";

export function InquiriesManagementLayout() {
  const matchDetail = useMatch("/inquiries/:id");
  const isModalOpen = Boolean(matchDetail);
  const navigate = useNavigate();

  const closeModal = () => navigate("/inquiries");

  return (
    <Container>
      <InquiriesListPage />
      <Modal isOpen={isModalOpen} onClose={closeModal} large>
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
