import styled from "styled-components";

import { AppIcon } from "@shared/ui/Icons";

interface Props {
  label: string;
  checked: boolean;
  onToggle: () => void;
  icon?: string;
}

export function Checkbox({ label, checked, onToggle, icon }: Readonly<Props>) {
  return (
    <Container onClick={onToggle} data-testid={`checkbox-${label}`}>
      <Label>
        {icon && <AppIcon icon={icon} size={16} />}
        {label}
      </Label>
      <Input type="checkbox" checked={checked} readOnly />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  gap: 0.25rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
