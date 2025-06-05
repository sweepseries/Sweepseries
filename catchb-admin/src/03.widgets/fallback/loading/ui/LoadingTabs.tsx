import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function LoadingTabs() {
  return (
    <Horizontal>
      <Skeleton height={36} width={80} />
      <Skeleton height={36} width={80} />
      <Skeleton height={36} width={80} />
    </Horizontal>
  );
}

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 12px;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.background500};
  border-radius: 8px;
`;
