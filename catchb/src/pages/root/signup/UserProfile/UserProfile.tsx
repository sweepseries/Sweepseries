import { useEffect, useState } from "react";
import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { TextButton } from "@components/Buttons";
import { Selector } from "@components/Selectors";
import { useAlert } from "@contexts/app";
import { useSignup } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { AuthInputTitle, AuthTextInput, BirthdateInputs } from "@features/Auth";
import { register } from "@services/auth";

const genderChoices = ["남성", "여성", "기타"];

export function UserProfile() {
  const [nickname, setNickname] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<string>("남성");

  const { showAlert } = useAlert();
  const { data } = useSignup();
  const { theme } = useTheme();

  const goToLoginPage = () => {
    showAlert({
      title: "회원가입 완료",
      message: "회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.",
      onConfirm: () => {
        router.dismissAll();
        if (data.mode === "catchb") {
          router.replace("/login");
        } else {
          router.replace("/");
        }
      },
    });
  };

  const handleSubmit = async (mode: "submit" | "skip") => {
    const response = await register({
      ...data,
      nickname: nickname || null,
      birth_year: birthYear,
      birth_month: birthMonth,
      birth_day: birthDate,
      gender: mode === "submit" ? gender : null,
    });

    if (response.status === 201) {
      goToLoginPage();
    } else if (response.data.error) {
      showAlert({
        title: "오류",
        message: response.data.error,
      });
    } else {
      showAlert({
        title: "오류",
        message: "오류가 발생했습니다. 다시 시도해주세요.",
      });
    }
  };

  useEffect(() => {
    if (data.mode !== "catchb") {
      setNickname(data.nickname ?? "");
      setGender(data.gender ?? "남성");
      setBirthYear(data.birth_year ?? "");
      setBirthMonth(data.birth_month ?? "");
      setBirthDate(data.birth_day ?? "");
    }
  }, []);

  return (
    <Container>
      <Contents>
        <Title>
          <GreenTitle>Catch B </GreenTitle>가입을 환영합니다 !
        </Title>
        <Subtitle>프로필을 완성해주세요</Subtitle>
        <Wrapper>
          <AuthInputTitle>닉네임</AuthInputTitle>
          <AuthTextInput
            value={nickname}
            onChangeText={setNickname}
            placeholder="닉네임을 입력해주세요"
            returnKeyType="next"
          />
        </Wrapper>
        <Wrapper>
          <AuthInputTitle>생년월일</AuthInputTitle>
          <BirthdateInputs
            year={birthYear}
            month={birthMonth}
            day={birthDate}
            setYear={setBirthYear}
            setMonth={setBirthMonth}
            setDay={setBirthDate}
          />
        </Wrapper>
        <Wrapper>
          <AuthInputTitle>성별</AuthInputTitle>
          <Selector
            options={genderChoices}
            onSelect={setGender}
            selected={gender}
          />
        </Wrapper>
      </Contents>
      <Buttons>
        <SubmitButtonWrapper>
          <TextButton text="시작하기" onPress={() => handleSubmit("submit")} />
        </SubmitButtonWrapper>
        <SkipButtonWrapper>
          <TextButton
            text="다음에"
            onPress={() => handleSubmit("skip")}
            backgroundColor={theme.background}
            color={theme.lowEmphasis}
          />
        </SkipButtonWrapper>
      </Buttons>
    </Container>
  );
}

const Container = styled.Pressable`
  flex: 1;
  justify-content: space-between;
  padding: 16px 16px 36px 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

const Contents = styled.View`
  flex: 1;
`;

const Subtitle = styled.Text`
  padding: 4px 0;
  font-size: 18px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const GreenTitle = styled(Title)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const Wrapper = styled.View`
  margin: 12px 0;
  gap: 8px;
`;

const Buttons = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const SubmitButtonWrapper = styled.View`
  flex: 3;
`;

const SkipButtonWrapper = styled(Contents)``;
