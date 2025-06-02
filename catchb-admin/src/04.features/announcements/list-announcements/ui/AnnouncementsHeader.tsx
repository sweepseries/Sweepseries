import { useNavigate } from "react-router";
import styled from "styled-components";

import { useAnnouncementsList } from "../hooks/useAnnouncementsList";
import { AddButton, SubTab, SubTabContainer } from "@shared/ui/Tabs";

export function AnnouncementsHeader() {
  const { mode, setMode, sort, setSort, setSortMode } = useAnnouncementsList();
  const navigate = useNavigate();

  const openCreateModal = () => {
    navigate("/announcements/create");
  };

  const resetSort = () => {
    setSort("기본");
    setSortMode("desc");
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
          onClick={() => setMode("삭제됨")}
          $isActive={mode === "삭제됨"}
          data-testid="삭제됨-tab"
        >
          삭제됨
        </SubTab>
      </SubTabContainer>
      <AddButton onClick={openCreateModal}>추가</AddButton>
      {sort !== "기본" && (
        <SubTab onClick={resetSort} $isActive data-testid="reset-sort">
          정렬 초기화
        </SubTab>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
