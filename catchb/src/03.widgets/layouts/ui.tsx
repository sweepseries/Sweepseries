import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import HorizontalLogo from "./horizontallogo.svg";
import { AppIcon } from "@shared/ui/Icons";

export function HeaderLeftBackButton() {
  const goBack = () => {
    router.back();
  };

  return (
    <TouchableOpacity onPress={goBack}>
      <AppIcon icon="chevron-left" />
    </TouchableOpacity>
  );
}

export function HeaderLeftLogo() {
  const width = 40;
  const height = width * 4.5;

  return <HorizontalLogo width={width} height={height} />;
}

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
