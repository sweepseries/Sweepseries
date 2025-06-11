import { Text } from "react-native";
import { act, render } from "@testing-library/react-native";

import { ScrollViewOnOverflow } from "../ScrollViewOnOverflow";

describe("ScrollViewOnOverflow", () => {
  it("renders children when content height is less than container height", () => {
    const { getByText, getByTestId } = render(
      <ScrollViewOnOverflow style={{ height: 100 }}>
        <Text>Content</Text>
      </ScrollViewOnOverflow>
    );

    expect(getByText("Content")).toBeTruthy();

    const scrollView = getByTestId("scroll-on-overflow");
    act(() => {
      scrollView.props.onContentSizeChange(0, 50);
    });
    act(() => {
      scrollView.props.onLayout({
        nativeEvent: {
          layout: { height: 100 },
        },
      });
    });
  });
});
