import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { Backdrop, Container } from "./_components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  large?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  large = false,
}: Readonly<Props>) {
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
      {large ? (
        <LargeContainer
          aria-modal="true"
          $isClosing={isClosing}
          onAnimationEnd={handleAnimationEnd}
          data-testid="modal-container"
        >
          {children}
        </LargeContainer>
      ) : (
        <SmallContainer
          aria-modal="true"
          $isClosing={isClosing}
          onAnimationEnd={handleAnimationEnd}
          data-testid="modal-container"
        >
          {children}
        </SmallContainer>
      )}
    </>,
    document.getElementById("modal-root")!
  );
}

const LargeContainer = styled(Container)`
  width: calc(100vw - 280px);
  max-width: 1440px;
`;

const SmallContainer = styled(Container)`
  width: 50vw;
`;
