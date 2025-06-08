import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { LoadingChat } from "@widgets/fallback/loading";

export function InquiriesDetailLoading() {
  return (
    <Wrapper>
      <Skeleton height={36} width={360} />
      <Skeleton height={24} width={240} />
      <Skeleton height={1} />
      <LoadingChat />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: 16px 24px;
  gap: 4px;
`;
