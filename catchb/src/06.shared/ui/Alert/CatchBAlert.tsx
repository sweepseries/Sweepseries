import { useEffect, useRef } from "react";
import { Animated, Dimensions, Modal, StyleSheet } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { Divider } from "@shared/ui/Dividers";

const { width } = Dimensions.get("window");

export interface AlertProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
}

export function CatchBAlert({
  title,
  message,
  onConfirm,
  confirmText = "확인",
}: Readonly<AlertProps>) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Modal transparent visible animationType="none" statusBarTranslucent>
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <ModalContents>
          {title && <Title>{title}</Title>}
          <Message>{message}</Message>
          <DividerWrapper>
            <Divider />
          </DividerWrapper>
          <Button onPress={onConfirm} testID="confirm">
            <ButtonText>{confirmText}</ButtonText>
          </Button>
        </ModalContents>
      </Animated.View>
    </Modal>
  );
}

const ModalContents = styled.View`
  align-items: center;
  width: ${width * 0.8}px;
  padding: 16px 24px 12px 24px;
  gap: 12px;
  background-color: #fff;
  border-radius: 8px;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const Message = styled.Text`
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
`;

const DividerWrapper = styled.View`
  width: 60%;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});
