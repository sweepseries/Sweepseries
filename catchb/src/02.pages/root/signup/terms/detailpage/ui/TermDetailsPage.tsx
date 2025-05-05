import { ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { LoadingTermDetails } from "./loading";
import { termsDetailPageStyles } from "./styles";
import { useTermsDetail } from "@entities/terms";
import { useAlert } from "@shared/lib/alert";
import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import { Divider } from "@shared/ui/Dividers";
import { useEffect } from "react";

export function TermsContentPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showAlert } = useAlert();
  const { colors } = useColors();
  const styles = termsDetailPageStyles(colors);

  if (!id) {
    showAlert({
      title: "오류 발생",
      message: "약관을 로드하는 중 오류가 발생했습니다. 다시 시도해주세요.",
      onConfirm: () => {
        router.back();
      },
    });

    return null;
  }

  const { data: term, isLoading, isError } = useTermsDetail(id);

  useEffect(() => {
    if (isError) {
      router.back();
      showAlert({
        title: "오류 발생",
        message: "약관을 로드하는 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    }
  }, [isError]);

  const handleClose = () => {
    router.back();
  };

  if (isLoading || !term) {
    return <LoadingTermDetails />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{term.title}</Text>
      <View style={styles.divider}>
        <Divider />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.content}>{term.content}</Text>
      </ScrollView>
      <TextButton text="닫기" onPress={handleClose} />
    </View>
  );
}
