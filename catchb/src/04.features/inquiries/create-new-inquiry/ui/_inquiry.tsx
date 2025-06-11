import { Text, TextInput, View } from "react-native";

import { useInquiryForm } from "../contexts/useInquiryForm";
import { formStyles } from "./styles";
import { InquiryCategoryType, inquiryCategories } from "@entities/inquiries";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";
import { MenuSelector } from "@shared/ui/Selectors";

export function InquirySegment() {
  const {
    category,
    setCategory,
    title,
    setTitle,
    content,
    setContent,
    scrollRef,
  } = useInquiryForm();
  const { colors } = useColors();
  const styles = formStyles(colors);

  const renderInquiryCategory = (category: InquiryCategoryType) => {
    return category.name;
  };

  const scrollOnFocus = () => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  };

  return (
    <>
      <View style={styles.segment}>
        <Text style={styles.subtitle}>질문구분</Text>
        <MenuSelector
          options={inquiryCategories}
          selected={category}
          onSelect={setCategory}
          keyExtractor={renderInquiryCategory}
        >
          <View style={styles.menuComponent}>
            <Text style={styles.menuText}>{category.name}</Text>
            <AppIcon
              icon="chevron-down"
              size={18}
              color={colors.mediumEmphasis}
            />
          </View>
        </MenuSelector>
      </View>
      <View style={styles.segment}>
        <Text style={styles.subtitle}>문의하기</Text>
        <TextInput
          style={styles.input}
          placeholder="제목"
          placeholderTextColor={colors.lowEmphasis}
          value={title}
          onChangeText={setTitle}
          onFocus={scrollOnFocus}
          testID="title-input"
        />
        <TextInput
          style={[styles.input, { minHeight: 100 }]}
          placeholder="내용"
          placeholderTextColor={colors.lowEmphasis}
          value={content}
          onChangeText={setContent}
          multiline
          onFocus={scrollOnFocus}
          testID="content-input"
        />
      </View>
    </>
  );
}
