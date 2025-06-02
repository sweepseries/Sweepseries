import styled from "styled-components";

export const SubTabContainer = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem;
  gap: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background700};
`;

export const SubTab = styled.button<{ $isActive?: boolean }>`
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

export const AddButton = styled.button`
  padding: 0.25rem 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background700};
`;
