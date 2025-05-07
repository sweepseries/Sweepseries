import styled from "styled-components/native";

interface Props {
  title: string;
}

export function HeaderTitle({ title }: Readonly<Props>) {
  return <Title>{title}</Title>;
}

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
`;
