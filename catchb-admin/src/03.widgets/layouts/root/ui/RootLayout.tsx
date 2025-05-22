import { Navigate, Outlet } from "react-router";
import styled from "styled-components";

import { Sidebar } from "./_sidebar";
import { useAuth } from "@shared/lib/auth";

export function RootLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background700};
  width: 100%;
  height: 100dvh;
  overflow-x: auto;
  user-select: none;
`;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
