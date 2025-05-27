import { useState } from "react";
import styled from "styled-components";

import { Tabs } from "./_tabs";
import { LogoutButton } from "@features/auth/logout";
import { useColors } from "@shared/lib/colors";
import { AppIcon, Logo } from "@shared/ui/Icons";

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const { colors } = useColors();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarWrapper style={{ width: sidebarOpen ? "240px" : "80px" }}>
      <Container style={{ width: sidebarOpen ? "240px" : "80px" }}>
        <Header>
          <Logo size={36} />
          <button onClick={toggleSidebar} data-testid="sidebar-toggle">
            <AppIcon
              icon={sidebarOpen ? "sidebar-close" : "sidebar-open"}
              color={colors.gray100}
              size={20}
            />
          </button>
        </Header>
        <Tabs isSidebarOpen={sidebarOpen} />
        <Footer>
          <LogoutButton isSidebarOpen={sidebarOpen} />
        </Footer>
      </Container>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  border-radius: 0 16px 16px 0;
  background-color: ${({ theme }) => theme.colors.text700};
  overflow-x: hidden;
  z-index: 10;
  transition: width 0.3s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  gap: 4px;

  > button {
    position: absolute;
    top: 36px;
    right: 16px;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 24px;

  border-top: 1px solid ${({ theme }) => theme.colors.background300};
`;
