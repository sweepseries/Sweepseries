import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styled from "styled-components/native";

import { Divider } from "@components/Dividers";
import { AppIcon } from "@components/Icons";
import { useAlert } from "@contexts/app";
import { useSignup } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { SignUpForm } from "@features/Auth";
import {
  TermsAndConditionsCheckType,
  TermsAndConditionsType,
} from "@models/app";
import { getTerms } from "@services/app";

export function TermsAndConditions() {
  const [terms, setTerms] = useState<TermsAndConditionsType[]>([]);
  const [checkedTerms, setCheckedTerms] = useState<
    TermsAndConditionsCheckType[]
  >([]);
  const [notificationsTermId, setNotificationsTermId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);

  const { showAlert } = useAlert();
  const { setNotificationsAgreed } = useSignup();
  const { mode } = useLocalSearchParams<{ mode: string }>();

  const allChecked = checkedTerms.every((term) => term.is_checked);
  const allRequiredChecked = checkedTerms.every(
    (term) => term.is_checked || !term.is_required
  );

  const handleButtonPress = () => {
    if (mode === "catchb") {
      router.push("/signup/username");
    } else {
      router.push("/signup/phone");
    }
  };

  const handleTermPress = (id: number) => {
    router.push(`/signup/terms/${id}`);
  };

  const isChecked = (id: number) => {
    const check = checkedTerms.find((check) => check.id === id);

    return check ? check.is_checked : false;
  };

  const setCheck = (id: number) => {
    setCheckedTerms(
      checkedTerms.map((check) =>
        check.id === id ? { ...check, is_checked: !check.is_checked } : check
      )
    );

    if (id === notificationsTermId) {
      setNotificationsAgreed(!isChecked(id));
    }
  };

  const checkAll = () => {
    const allChecked = checkedTerms.every((check) => check.is_checked);

    if (allChecked) {
      setCheckedTerms(
        checkedTerms.map((term) => ({ ...term, is_checked: false }))
      );
      setNotificationsAgreed(false);
    } else {
      setCheckedTerms(
        checkedTerms.map((term) => ({ ...term, is_checked: true }))
      );
      setNotificationsAgreed(true);
    }
  };

  useEffect(() => {
    const fetchTerms = async () => {
      const response = await getTerms();

      if (response) {
        setTerms(response);
        setLoading(false);
      } else {
        showAlert({
          title: "약관 조회 실패",
          message: "약관을 조회하는데 실패했습니다. 다시 시도해주세요.",
          onConfirm: () => router.back(),
        });
      }
    };

    fetchTerms();
  }, []);

  useEffect(() => {
    setCheckedTerms(
      terms.map((term) => ({
        id: term.id,
        is_checked: false,
        is_required: term.is_required,
      }))
    );

    const notificationsTerm = terms.find((term) =>
      term.title.includes("알림 수신 동의")
    );

    setNotificationsTermId(notificationsTerm?.id ?? -1);
  }, [terms]);

  return (
    <SignUpForm
      title="Catch B 약관에 동의해주세요!"
      subtitle="캐치비 이용을 위해 필수 약관 동의가 필요합니다."
      buttonText="다음으로"
      buttonOnPress={handleButtonPress}
      buttonDisabled={!allRequiredChecked}
    >
      <Divider />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Checkbox
            text="모두 동의 합니다."
            checked={allChecked}
            onChange={checkAll}
          />
          <Divider />
          {terms.map((term) => (
            <Checkbox
              key={term.id}
              text={`(${term.is_required ? "필수" : "선택"}) ${term.title}`}
              checked={isChecked(term.id)}
              onChange={() => setCheck(term.id)}
              rightPress={
                term.content ? () => handleTermPress(term.id) : undefined
              }
            />
          ))}
        </>
      )}
    </SignUpForm>
  );
}

function Loading() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item width="auto" height={40} borderRadius={8} />
    </SkeletonPlaceholder>
  );
}

interface Props {
  text: string;
  checked: boolean;
  onChange: () => void;
  rightPress?: () => void;
}

function Checkbox({ text, checked, onChange, rightPress }: Readonly<Props>) {
  const { theme } = useTheme();

  return (
    <CheckboxContainer>
      <CheckboxContent onPress={onChange}>
        <AppIcon
          icon="check-circle"
          color={checked ? theme.primary : theme.lowEmphasis}
          size={24}
        />
        <Text>{text}</Text>
      </CheckboxContent>
      {rightPress && (
        <TouchableOpacity onPress={rightPress} testID={`right-${text}`}>
          <AppIcon icon="chevron-right" color={theme.lowEmphasis} size={16} />
        </TouchableOpacity>
      )}
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxContent = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
