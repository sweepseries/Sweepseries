import { useState } from "react";
import { router } from "expo-router";
import styled from "styled-components/native";

import { catchBLogin } from "@entities/auth";
import { useAlert } from "@shared/lib/alert";
import { useAuth } from "@shared/lib/auth";
import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import { AuthTextInput } from "@shared/ui/TextInput";

export function CatchBLoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { showAlert } = useAlert();
  const { saveLoginStatus } = useAuth();
  const { colors } = useColors();

  const handleLoginButtonPress = async () => {
    if (username.length === 0 || password.length === 0) {
      showAlert({
        title: "로그인 실패",
        message: "아이디와 비밀번호를 입력해주세요.",
        confirmText: "확인",
      });
      return;
    }

    const result = await catchBLogin(username, password);

    if (result) {
      saveLoginStatus(result);

      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("/home");
    }
  };

  return (
    <Container>
      <AuthTextInput
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={colors.lowEmphasis}
        testID="아이디"
      />
      <AuthTextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={colors.lowEmphasis}
        testID="비밀번호"
      />
      <TextButton text="로그인" onPress={handleLoginButtonPress} />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  margin: 8px 0 0 0;
  padding: 0 24px;
  gap: 8px;
`;
