import { useMemo } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface Props {
  text: string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

/**
 * 주어진 텍스트를 최대 지정한 줄 수(numberOfLines)만큼 표시하고,
 * 줄 수를 초과하는 경우 말줄임표(…)를 마지막 줄 끝에 붙여 잘라내서 표시하는 컴포넌트.
 */

export function TruncatedText({
  text,
  numberOfLines = 1,
  style,
}: Readonly<Props>) {
  /* React Native Text 컴포넌트의 numberOfLines + ellipsizeMode 속성은 하나의 줄이 길 때 정상적으로 동작하지만
   * 여러 줄이 있는 경우에는 제대로 동작하지 않음.
   * 따라서, 직접 줄 수를 계산하여 텍스트를 잘라내는 로직을 구현함.
   */

  const displayText = useMemo(() => {
    const parts = text.split("\n");

    if (parts.length <= numberOfLines) {
      return text;
    }

    const headLines = parts.slice(0, numberOfLines).join("\n").trim();
    return `${headLines} \u22EF`;
  }, [text, numberOfLines]);

  return (
    <Text ellipsizeMode="tail" numberOfLines={numberOfLines} style={style}>
      {displayText}
    </Text>
  );
}
