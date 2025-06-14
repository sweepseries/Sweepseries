import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import { useBufferedInput } from "@shared/lib/throttler";

const Component = () => {
  const [value, setValue] = useState<string>("initial value");
  const bufferedValue = useBufferedInput(value, 300);

  return (
    <View>
      <TextInput value={value} onChangeText={setValue} testID="input" />
      <Text testID="value">{bufferedValue}</Text>
    </View>
  );
};

describe("useBufferedInput", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should initialize with the provided value", () => {
    const { getByTestId } = render(<Component />);

    const valueText = getByTestId("value");
    expect(valueText.props.children).toBe("initial value");

    act(() => {
      fireEvent.changeText(getByTestId("input"), "new value");
    });
    expect(valueText.props.children).toBe("initial value");

    act(() => {
      jest.advanceTimersByTime(301);
    });
    waitFor(() => {
      expect(valueText.props.children).toBe("new value");
    });
  });
});
