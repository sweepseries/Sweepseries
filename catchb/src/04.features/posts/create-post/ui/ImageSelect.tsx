import { useState } from "react";
import { Modal, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { useCreatePostForm } from "../contexts/useCreatePostForm";
import { useColors } from "@shared/lib/colors";
import { useImagePicker } from "@shared/lib/image-picker";
import { Divider } from "@shared/ui/Dividers";
import { AppIcon } from "@shared/ui/Icons";
import { ImagePreview } from "@shared/ui/Images";

export function ImageSelect() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { imageFiles, setImageFiles } = useCreatePostForm();
  const { selectImage, takePhoto } = useImagePicker();
  const { colors } = useColors();

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const onSelectImage = async () => {
    const images = await selectImage(10);

    if (images) {
      for (const image of images) {
        if (!imageFiles.some((file) => file.fileName === image.fileName)) {
          setImageFiles((prev) => [...prev, image]);
        }
      }
    }

    closeMenu();
  };

  const onTakePhoto = async () => {
    const image = await takePhoto();

    if (image) {
      setImageFiles((prev) => [...prev, image]);
    }

    closeMenu();
  };

  const removeImage = (uri: string) => {
    setImageFiles((prev) => prev.filter((file) => file.uri !== uri));
  };

  return (
    <>
      <Container>
        {imageFiles.length > 0 && (
          <>
            <ImagePreviews>
              {imageFiles.map((file) => (
                <ImagePreview
                  key={file.uri}
                  imageUrl={file.uri}
                  onRemove={() => removeImage(file.uri)}
                  size={72}
                />
              ))}
            </ImagePreviews>
            <Divider />
          </>
        )}
        <ButtonWrapper>
          <TouchableOpacity onPress={openMenu} testID="image-select-button">
            <AppIcon
              icon="camera-outline"
              size={24}
              color={colors.highEmphasis}
            />
          </TouchableOpacity>
        </ButtonWrapper>
      </Container>
      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={closeMenu}
        testID="image-select-modal"
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={closeMenu}
          testID="close-modal"
        />
        <Wrapper>
          <Menu>
            <TouchableOpacity onPress={onTakePhoto} testID="take-photo">
              <MenuText>사진 촬영하기</MenuText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={onSelectImage} testID="select-image">
              <MenuText>앨범에서 선택</MenuText>
            </TouchableOpacity>
          </Menu>
        </Wrapper>
      </Modal>
    </>
  );
}

const Container = styled.View`
  flex-direction: column;
  padding: 4px 12px;
  gap: 8px;
`;

const ImagePreviews = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
`;

const Wrapper = styled.View`
  position: absolute;
  bottom: 172px;
  left: 24px;
`;

const Menu = styled.View`
  padding: 4px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  z-index: 100;
`;

const MenuText = styled.Text`
  padding: 4px;
  font-size: 14px;
`;
