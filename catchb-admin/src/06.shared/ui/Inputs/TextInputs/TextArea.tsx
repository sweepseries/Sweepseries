import styled from "styled-components";

import { Container, Label } from "./_components";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: Readonly<Props>) {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={`textarea-${label}`}
      />
    </Container>
  );
}

const Input = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray900}`};
  background-color: ${({ theme }) => theme.colors.background100};
  resize: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;
