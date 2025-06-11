import { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

import { withdrawPageStyles } from "./styles";
import {
  WithdrawReasonToggle,
  WithdrawReasonType,
  useDeleteAccount,
  withdrawReasons,
} from "@features/auth/delete-account";
import { useAlert } from "@shared/lib/alert";
import { useAuth } from "@shared/lib/auth";
import { useColors } from "@shared/lib/colors";
import { KeyboardWrapper } from "@shared/lib/keyboard";
import { TextButton } from "@shared/ui/Buttons";
import { ScrollViewOnOverflow } from "@shared/ui/ScrollView";

// TODO: 네이버 & 카카오 unlink

export function WithdrawPage() {
  const [selectedReasonId, setSelectedReasonId] = useState<number>(1);
  const [reasonText, setReasonText] = useState<string>(
    withdrawReasons[0].reason
  );

  const { showAlert } = useAlert();
  const { resetLoginStatus, user } = useAuth();
  const { colors } = useColors();
  const { mutate: deleteAccount } = useDeleteAccount();
  const styles = withdrawPageStyles(colors);
  const ref = useRef<ScrollView>(null);

  const toggleSelect = (reason: WithdrawReasonType) => {
    setSelectedReasonId(reason.id);
    if (reason.id === 7) {
      setReasonText("");
    } else {
      setReasonText(reason.reason);
    }
  };

  const goToTopPage = () => {
    router.dismissAll();
    router.replace("/");
  };

  const requestWithdraw = async () => {
    if (user?.uuid === undefined) {
      showAlert({
        title: "오류",
        message: "오류가 발생했습니다. 다시 시도해주세요.",
      });
      return;
    }

    deleteAccount(
      {
        reason: selectedReasonId,
        reason_text: reasonText,
        uuid: user?.uuid,
      },
      {
        onSuccess: () => {
          resetLoginStatus();
          goToTopPage();
        },
        onError: () => {
          showAlert({
            title: "오류",
            message: "오류가 발생했습니다. 다시 시도해주세요.",
          });
        },
      }
    );
  };

  const scrollToShowInput = () => {
    // wait 100ms to ensure the keyboard is shown
    setTimeout(() => {
      ref.current?.scrollTo({
        animated: true,
        y: 200,
      });
    }, 100);
  };

  const handleDeleteButtonPress = () => {
    showAlert({
      title: "회원탈퇴",
      message: "정말로 회원탈퇴 하시겠습니까?",
      onConfirm: requestWithdraw,
      enableCancel: true,
    });
  };

  const isCustomInput = selectedReasonId === 7;
  const isButtonActive = selectedReasonId !== 7 || reasonText.length > 9;

  return (
    <KeyboardWrapper padding={16}>
      <View style={styles.container}>
        <ScrollViewOnOverflow style={styles.wrapper} ref={ref}>
          <Text style={styles.title}>무엇이 불편하셨나요?</Text>
          <Text style={styles.helper}>
            탈퇴 이유를 알려주시면 불편 사항을 개선할 수 있도록 중요한 자료로
            활용하겠습니다.
          </Text>
          <View style={styles.checkButtons}>
            {withdrawReasons.map((reason) => (
              <WithdrawReasonToggle
                key={reason.id}
                reason={reason}
                onPress={toggleSelect}
                isSelected={selectedReasonId === reason.id}
              />
            ))}
          </View>
          {isCustomInput && (
            <TextInput
              value={reasonText}
              onChangeText={setReasonText}
              onFocus={scrollToShowInput}
              placeholder="탈퇴 사유를 직접 입력해주세요. (최소 10자 이상)"
              style={styles.input}
              multiline
              numberOfLines={4}
              testID="custom-reason-input"
            />
          )}
        </ScrollViewOnOverflow>
        <TextButton
          text="탈퇴하기"
          onPress={handleDeleteButtonPress}
          active={isButtonActive}
        />
      </View>
    </KeyboardWrapper>
  );
}
