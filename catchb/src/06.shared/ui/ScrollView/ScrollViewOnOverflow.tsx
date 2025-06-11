import { forwardRef, useState } from "react";
import { LayoutChangeEvent, ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

/**
 * overflow가 발생할 때는 ScrollView를, 그렇지 않을 때는 View를 렌더링합니다.
 */

export const ScrollViewOnOverflow = forwardRef<ScrollView, ScrollViewProps>(
  ({ children, ...props }, ref) => {
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [contentHeight, setContentHeight] = useState<number>(0);

    const onContainerLayout = (e: LayoutChangeEvent) => {
      setContainerHeight(e.nativeEvent.layout.height);
    };

    return (
      <ScrollView
        {...props}
        ref={ref}
        scrollEnabled={contentHeight > containerHeight}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        onLayout={onContainerLayout}
        showsVerticalScrollIndicator={false}
        testID="scroll-on-overflow"
      >
        {children}
      </ScrollView>
    );
  }
);

ScrollViewOnOverflow.displayName = "ScrollViewOnOverflow";
