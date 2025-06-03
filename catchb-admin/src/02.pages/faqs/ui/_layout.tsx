import { Outlet, useMatch, useNavigate } from "react-router";
import styled from "styled-components";

import { FAQsListPage } from "./FAQsList/FAQsListPage";
import { Modal } from "@widgets/layouts/modals";

export function FAQsManagementLayout() {
  const matchCreate = useMatch("/faqs/create");
  const matchDetail = useMatch("/faqs/:id");
  const matchEdit = useMatch("/faqs/:id/edit");
  const isModalOpen = Boolean(matchCreate ?? matchDetail ?? matchEdit);
  const navigate = useNavigate();

  const closeModal = () => navigate("/faqs");

  return (
    <Container>
      <FAQsListPage />
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
