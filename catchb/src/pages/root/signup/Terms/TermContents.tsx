import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { TextButton } from "@components/Buttons";
import { Divider } from "@components/Dividers";
import { ThemeColorType, useTheme } from "@contexts/theme";
import { TermsAndConditionsType } from "@models/app";
import { getTermsDetail } from "@services/app";

export function TermContents() {
  const [term, setTerm] = useState<TermsAndConditionsType>();

  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTermsDetail(id);

      if (response) {
        setTerm(response);
      }
    };

    fetchData();
  }, [id]);

  if (!term) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{term.title}</Text>
      <View style={styles.divider}>
        <Divider />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.content}>{term.content}</Text>
      </ScrollView>
      <TextButton text="닫기" onPress={handleClose} />
    </View>
  );
}

const createStyles = (theme: ThemeColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 24,
      paddingHorizontal: 16,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.highEmphasis,
    },
    divider: {
      marginVertical: 16,
    },
    content: {
      flex: 1,
    },
  });
