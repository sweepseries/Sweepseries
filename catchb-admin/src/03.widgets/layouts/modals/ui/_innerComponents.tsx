import styled from "styled-components";

export const ModalInnerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: 1rem 0;
  gap: 1rem;
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
`;

export const ModalContentVertical = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;
