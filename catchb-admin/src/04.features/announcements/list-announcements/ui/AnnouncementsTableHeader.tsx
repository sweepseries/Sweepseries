import styled from "styled-components";

import { useAnnouncementsList } from "../hooks/useAnnouncementsList";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

export function AnnouncementsTableHeader() {
  const { setSort, sort, setSortMode, sortMode } = useAnnouncementsList();
  const { colors } = useColors();

  const handleSort = (newSort: "ID" | "생성일" | "수정일") => {
    if (sort === newSort) {
      setSortMode(sortMode === "asc" ? "desc" : "asc");
    } else {
      setSort(newSort);
      setSortMode("desc");
    }
  };

  return (
    <HeaderRow>
      <button onClick={() => handleSort("ID")} data-testid="sort-id">
        ID
        {sort === "ID" && (
          <>
            {sortMode === "asc" ? (
              <AppIcon icon="arrow-up" size={16} color={colors.text700} />
            ) : (
              <AppIcon icon="arrow-down" size={16} color={colors.text700} />
            )}
          </>
        )}
      </button>
      <span>제목</span>
      <span>상태</span>
      <button onClick={() => handleSort("생성일")} data-testid="sort-created-at">
        생성일
        {sort === "생성일" && (
          <>
            {sortMode === "asc" ? (
              <AppIcon icon="arrow-up" size={16} color={colors.text700} />
            ) : (
              <AppIcon icon="arrow-down" size={16} color={colors.text700} />
            )}
          </>
        )}
      </button>
      <button onClick={() => handleSort("수정일")} data-testid="sort-updated-at">
        수정일
        {sort === "수정일" && (
          <>
            {sortMode === "asc" ? (
              <AppIcon icon="arrow-up" size={16} color={colors.text700} />
            ) : (
              <AppIcon icon="arrow-down" size={16} color={colors.text700} />
            )}
          </>
        )}
      </button>
    </HeaderRow>
  );
}

const HeaderRow = styled.div`
  display: flex;
  align-items: center;

  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text700};

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-left: 1px solid ${({ theme }) => theme.colors.gray700};
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-left: 1px solid ${({ theme }) => theme.colors.gray700};
  }

  > button:first-child {
    width: 3rem;
    border-left: none;
  }

  > span:nth-child(2) {
    flex: 1;
    max-width: 20rem;
  }

  > span:nth-child(3) {
    width: 4rem;
  }

  > button:nth-child(4),
  > button:nth-child(5) {
    width: 6rem;
  }
`;
