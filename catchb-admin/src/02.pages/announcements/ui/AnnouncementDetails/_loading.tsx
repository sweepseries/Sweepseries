import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function AnnouncementDetailsLoading() {
  return (
    <Wrapper>
      <Skeleton height={36} width={360} />
      <Content>
        <Skeleton height={24} />
        <Skeleton height={24} />
        <Skeleton height={24} />
        <Skeleton height={24} width="45%" />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 24px;
  gap: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
