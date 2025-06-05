import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function LoadingTabs() {
  return (
    <Wrapper>
      <Horizontal>
        <Skeleton height={32} width={80} />
        <Skeleton height={32} width={80} />
        <Skeleton height={32} width={80} />
      </Horizontal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 12px;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.background700};
  border-radius: 8px;
`;
