import styled from "styled-components";

import { Container, Label } from "./_components";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: Readonly<Props>) {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={`textinput-${label}`}
      />
    </Container>
  );
}

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray900}`};
  background-color: ${({ theme }) => theme.colors.background100};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;
