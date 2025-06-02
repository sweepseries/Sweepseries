import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function FAQCategoriesLoading() {
  return (
    <Tabs>
      <Skeleton width={40} height={24} />
      <Skeleton width={40} height={24} />
      <Skeleton width={40} height={24} />
      <Skeleton width={40} height={24} />
    </Tabs>
  );
}

export function FAQsListLoading() {
  return (
    <Wrapper>
      <Skeleton height={32} />
      <Skeleton height={32} />
      <Skeleton height={32} />
      <Skeleton height={32} />
      <Skeleton height={32} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 8px;
`;
