import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes } from "styled-components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function LargeModal({ isOpen, onClose, children }: Readonly<Props>) {
  const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleOpen = () => {
      setShouldRender(true);
      setIsClosing(false);
    };

    const handleClose = () => {
      if (shouldRender) {
        setIsClosing(true);
      }
    };

    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [isOpen, shouldRender]);

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      setShouldRender(false);
      setIsClosing(false);
    }
  }, [isClosing]);

  if (!shouldRender) {
    return null;
  }

  return createPortal(
    <>
      <Backdrop onClick={onClose} data-testid="backdrop" />
      <Container
        aria-modal="true"
        $isClosing={isClosing}
        onAnimationEnd={handleAnimationEnd}
        data-testid="modal-container"
      >
        {children}
      </Container>
    </>,
    document.getElementById("modal-root")!
  );
}

const Backdrop = styled.div`
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

const Container = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 88px;
  right: 0;
  height: 70vh;
  width: calc(100vw - 360px);
  max-width: 920px;
  border-radius: 16px 0 0 16px;
  background-color: ${({ theme }) => theme.colors.background300};
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
