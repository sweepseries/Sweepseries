import { useNavigate } from "react-router";
import styled from "styled-components";

import { useTermsList } from "../hooks/useTermsList";

export function TermTabs() {
  const { mode, setMode } = useTermsList();
  const navigate = useNavigate();

  const openCreateModal = () => {
    navigate("/terms/create");
  };

  return (
    <Wrapper>
      <Container>
        <Button
          onClick={() => setMode("전체")}
          $isActive={mode === "전체"}
          data-testid="전체-tab"
        >
          전체
        </Button>
        <Button
          onClick={() => setMode("유효")}
          $isActive={mode === "유효"}
          data-testid="유효-tab"
        >
          유효
        </Button>
        <Button
          onClick={() => setMode("무효")}
          $isActive={mode === "무효"}
          data-testid="무효-tab"
        >
          무효
        </Button>
      </Container>
      <AddButton onClick={openCreateModal}>추가</AddButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem;
  gap: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background700};
`;

const Button = styled.button<{ $isActive?: boolean }>`
  padding: 0.25rem 0.75rem;
  font-size: 1rem;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.secondary};
  border-radius: 0.33rem;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.background500 : "transparent"};
  transition: background-color 0.5s ease-in-out;
  cursor: pointer;
`;

const AddButton = styled.button`
  padding: 0.25rem 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background700};
`;
