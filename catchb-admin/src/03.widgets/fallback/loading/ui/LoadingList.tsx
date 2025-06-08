import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function LoadingList() {
  return (
    <Wrapper>
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;
