import { View } from "react-native";
import { SvgCssUri } from "react-native-svg/css";
import styled from "styled-components/native";

interface Props {
  type?: "vertical" | "horizontal";
  height?: number;
  color?: string;
  opacity?: number;
}

export function CatchBLogo({
  type = "vertical",
  height = 160,
  color = "#083F25",
  opacity = 1,
}: Readonly<Props>) {
  if (type === "horizontal") {
    const width = height * 4.5;

    return (
      <View>
        <SvgCssUri
          uri="https://kr.object.ncloudstorage.com/sweep.resources/mainlogo_horizontal.svg"
          width={width}
          height={height}
        />
      </View>
    );
  } else {
    return (
      <Container>
        <SvgCssUri
          uri="https://kr.object.ncloudstorage.com/sweep.resources/mainlogo.svg"
          width={height}
          height={height}
          color={color}
          opacity={opacity}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  gap: 64px;
`;
