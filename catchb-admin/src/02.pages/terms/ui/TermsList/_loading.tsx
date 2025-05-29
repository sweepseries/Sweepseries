import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function TermsListLoading() {
  return (
    <Wrapper>
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 8px;
`;
