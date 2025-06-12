import { Image } from "expo-image";
import styled from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  imageUrl: string;
  onRemove: () => void;
  size?: number;
}

export function ImagePreview({
  imageUrl,
  onRemove,
  size = 120,
}: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container style={{ width: size, height: size }}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: size,
          height: size,
          borderRadius: 8,
        }}
        contentFit="cover"
      />
      <RemoveButton onPress={onRemove}>
        <AppIcon icon="minus" size={16} color={colors.error} />
      </RemoveButton>
    </Container>
  );
}

const Container = styled.View`
  position: relative;
`;

const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
`;
