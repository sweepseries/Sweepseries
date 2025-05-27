import styled from "styled-components";

interface Props {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export function Checkbox({ label, checked, onToggle }: Readonly<Props>) {
  return (
    <Container onClick={onToggle} data-testid={`checkbox-${label}`}>
      <Label>{label}</Label>
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
  padding: 0 0.25rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
