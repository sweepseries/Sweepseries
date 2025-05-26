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
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background300};
  width: 100%;
  height: 100dvh;
  overflow-x: auto;
  user-select: none;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
