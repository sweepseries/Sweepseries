import { Text, TextInput, View } from "react-native";

import { useInquiryForm } from "../providers/InquiryFormProvider";
import { formStyles } from "./styles";
import { InquiryCategoryType, inquiryCategories } from "@entities/inquiries";
import { useColors } from "@shared/lib/colors";
import { MenuSelector } from "@shared/ui/Selectors";

export function InquirySegment() {
  const { category, setCategory, title, setTitle, content, setContent } =
    useInquiryForm();
  const { colors } = useColors();
  const styles = formStyles(colors);

  const renderInquiryCategory = (category: InquiryCategoryType) => {
    return category.name;
  };

  return (
    <>
      <View style={styles.segment}>
        <Text style={styles.subtitle}>질문구분</Text>
        <MenuSelector
          options={inquiryCategories}
          selected={category}
          onSelect={setCategory}
          renderLabel={renderInquiryCategory}
        />
      </View>
      <View style={styles.segment}>
        <Text style={styles.subtitle}>문의하기</Text>
        <TextInput
          style={styles.input}
          placeholder="제목"
          placeholderTextColor={colors.lowEmphasis}
          value={title}
          onChangeText={setTitle}
          testID="title-input"
        />
        <TextInput
          style={[styles.input, { minHeight: 100 }]}
          placeholder="내용"
          placeholderTextColor={colors.lowEmphasis}
          value={content}
          onChangeText={setContent}
          multiline
          testID="content-input"
        />
      </View>
    </>
  );
}
