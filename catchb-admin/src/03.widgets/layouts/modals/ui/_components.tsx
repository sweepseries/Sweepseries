import styled, { css, keyframes } from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(100%); }
`;

export const Container = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 88px;
  right: 0;
  height: calc(100dvh - 108px);
  border-radius: 16px 0 0 16px;
  background-color: ${({ theme }) => theme.colors.background500};
  transform: translateX(100%);
  animation: ${({ $isClosing }) =>
    $isClosing
      ? css`
          ${slideOut} 0.3s ease-in forwards
        `
      : css`
          ${slideIn} 0.3s ease-out forwards
        `};
  z-index: 12;
`;
