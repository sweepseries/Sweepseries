import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";

import { SidebarTab, type TabType, tabs } from "@shared/lib/navigation";

interface Props {
  isSidebarOpen: boolean;
}

export function Tabs({ isSidebarOpen }: Readonly<Props>) {
  const [selectedPathName, setSelectedPathName] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (path: string) => {
    navigate(`/${path}`);
  };

  useEffect(() => {
    const path = location.pathname.split("/")[1];

    setSelectedPathName(path);
  }, [location]);

  return (
    <TabsWrapper>
      {tabs.map((tab: TabType) => (
        <SidebarTab
          key={tab.pathName}
          tab={tab}
          isSidebarOpen={isSidebarOpen}
          isSelected={selectedPathName === tab.pathName}
          onClick={() => handleTabClick(tab.pathName)}
        />
      ))}
    </TabsWrapper>
  );
}

const TabsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
  gap: 8px;
  overflow-y: auto;
`;
