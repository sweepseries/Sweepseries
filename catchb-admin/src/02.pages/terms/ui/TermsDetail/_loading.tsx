import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function TermDetailsLoading() {
  return (
    <Wrapper>
      <Skeleton height={36} width={360} />
      <Horizontal>
        <List>
          <Skeleton height={24} />
          <Skeleton height={24} />
          <Skeleton height={24} />
        </List>
        <Skeleton height="100%" width={1} />
        <Content>
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} width="64%" />
        </Content>
      </Horizontal>
    </Wrapper>
  );
}

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

const Horizontal = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
`;

const Wrapper = styled(Vertical)`
  flex: 1;
  height: 100%;
  padding: 16px 24px;
  gap: 16px;
`;

const List = styled(Vertical)`
  flex: 1;
  gap: 8px;
`;

const Content = styled(Vertical)`
  flex: 2;
  gap: 4px;
`;
