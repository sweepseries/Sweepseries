import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { LoadingFAQs } from "./loading";
import { listPageStyles } from "./styles";
import {
  CategoryList,
  CategoryTabs,
  FAQListProvider,
  useFAQList,
} from "@features/faqs/read-faqs";
import { useColors } from "@shared/lib/colors";

export function FAQsPage() {
  return (
    <FAQListProvider>
      <ListComponents />
    </FAQListProvider>
  );
}

function ListComponents() {
  const { colors } = useColors();
  const { isLoading } = useFAQList();
  const styles = listPageStyles(colors);

  if (isLoading) {
    return <LoadingFAQs />;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.contents}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <CategoryTabs />
        <CategoryList />
      </ScrollView>
    </View>
  );
}
