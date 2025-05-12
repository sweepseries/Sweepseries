import { Platform } from "react-native";
import styled from "styled-components/native";

interface Props {
  title: string;
}

export function HeaderTitle({ title }: Readonly<Props>) {
  if (Platform.OS === "android") {
    return <AndroidTitle>{title}</AndroidTitle>;
  }
  return <Title>{title}</Title>;
}

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
`;

const AndroidTitle = styled(Title)`
  margin-left: 12px;
`;
