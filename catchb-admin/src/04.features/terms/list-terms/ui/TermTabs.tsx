import { useNavigate } from "react-router";
import styled from "styled-components";

import { useTermsList } from "../hooks/useTermsList";
import { AddButton, SubTab, SubTabContainer } from "@shared/ui/Tabs";

export function TermTabs() {
  const { mode, setMode } = useTermsList();
  const navigate = useNavigate();

  const openCreateModal = () => {
    navigate("/terms/create");
  };

  return (
    <Wrapper>
      <SubTabContainer>
        <SubTab
          onClick={() => setMode("전체")}
          $isActive={mode === "전체"}
          data-testid="전체-tab"
        >
          전체
        </SubTab>
        <SubTab
          onClick={() => setMode("유효")}
          $isActive={mode === "유효"}
          data-testid="유효-tab"
        >
          유효
        </SubTab>
        <SubTab
          onClick={() => setMode("무효")}
          $isActive={mode === "무효"}
          data-testid="무효-tab"
        >
          무효
        </SubTab>
      </SubTabContainer>
      <AddButton onClick={openCreateModal}>추가</AddButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
