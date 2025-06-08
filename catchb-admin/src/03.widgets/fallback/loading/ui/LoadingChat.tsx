import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function LoadingChat() {
  return (
    <Chat>
      <Left>
        <Skeleton height={36} width={36} borderRadius={18} />
        <Skeleton height={120} width={360} />
      </Left>
      <Right>
        <Skeleton height={120} width={360} />
        <Skeleton height={36} width={36} borderRadius={18} />
      </Right>
    </Chat>
  );
}

const Chat = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 16px;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Left = styled(Horizontal)`
  align-self: flex-start;
`;

const Right = styled(Horizontal)`
  align-self: flex-end;
`;
