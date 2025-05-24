import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function LargeModal({ isOpen, onClose, children }: Readonly<Props>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <Backdrop onClick={onClose} data-testid="backdrop" />
      <Container aria-modal="true">{children}</Container>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.dialog`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
