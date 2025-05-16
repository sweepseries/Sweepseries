import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useInquiryForm } from "../provider/InquiryFormProvider";
import { formStyles } from "./styles";
import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import { Divider } from "@shared/ui/Dividers";
import { AppIcon } from "@shared/ui/Icons";

export function FormFooter() {
  const [termAccepted, setTermAccepted] = useState<boolean>(false);

  const { closeForm } = useInquiryForm();
  const { colors } = useColors();
  const styles = formStyles(colors);

  const toggleTermAccepted = () => {
    setTermAccepted((prev) => !prev);
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerContents}>
        <View style={styles.guideWrapper}>
          <Text style={styles.footerTitle}>
            개인정보 수집 및 이용에 대한 동의
          </Text>
          <Text style={styles.guideText}>
            수집 항목 : 이름, 이메일, 연락처(휴대폰번호 등), 사용환경
            정보(디바이스, OS, 브라우저 등)
          </Text>
          <Text style={styles.guideText}>
            수집 목적 : 서비스 이용에 따른 고객 문의, 불만처리, 오류 해결 등
            민원 처리 및 결과 회신
          </Text>
          <Text style={styles.guideText}>
            보유 및 이용 기간 : 문의처리 후 3년간 보관
          </Text>
          <Text style={styles.guideText}>
            {" \u2022"} 그 밖의 사항은 개인정보 처리방침을 준수합니다.
          </Text>
        </View>
        <Divider />
        <TouchableOpacity style={styles.checkbox} onPress={toggleTermAccepted}>
          <AppIcon
            icon="check-circle"
            size={20}
            color={termAccepted ? colors.primary : colors.lowEmphasis}
          />
          <Text style={styles.checkboxText}>
            개인정보 수집 및 이용에 대해 동의합니다.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <View style={styles.mainButtonWrapper}>
          <TextButton text="등록" onPress={() => {}} active={termAccepted} />
        </View>
        <View style={styles.cancelButtonWrapper}>
          <TextButton
            text="취소"
            onPress={closeForm}
            color={colors.lowEmphasis}
            backgroundColor={colors.border}
          />
        </View>
      </View>
    </View>
  );
}
