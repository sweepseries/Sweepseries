import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";

import { LogoutButton } from "@features/auth/logout";
import { SidebarTab, type TabType, tabs } from "@shared/lib/navigation";
import { Logo } from "@shared/ui/Icons";

export function Sidebar() {
  const [selectedPathName, setSelectedPathName] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // first level
    const path = location.pathname.split("/")[1];

    setSelectedPathName(path);
  }, [location]);

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <Header>
        <Logo size={160} />
      </Header>
      <TabsWrapper>
        {tabs.map((tab: TabType) => (
          <SidebarTab
            key={tab.path}
            title={tab.title}
            isSelected={selectedPathName === tab.pathName}
            onClick={() => handleTabClick(tab.path)}
          />
        ))}
      </TabsWrapper>
      <Footer>
        <LogoutButton />
      </Footer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  background-color: #262626;
  color: white;
  padding: 24px;
  height: 100dvh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  border-radius: 0 20px 20px 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  gap: 4px;
`;

const TabsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 8px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;
