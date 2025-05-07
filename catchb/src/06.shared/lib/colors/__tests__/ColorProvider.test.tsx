import RN, { Text, View } from "react-native";
import { render } from "@testing-library/react-native";

import { ColorsProvider, useColors } from "@shared/lib/colors";

jest.unmock("@shared/lib/colors");

const MockComponent = () => {
  const { colors } = useColors();

  return (
    <View>
      <Text>{colors.primary}</Text>
    </View>
  );
};

describe("ColorsProvider", () => {
  it("should handle light colors", () => {
    jest.spyOn(RN, "useColorScheme").mockReturnValue("light");

    const { getByText } = render(
      <ColorsProvider>
        <MockComponent />
      </ColorsProvider>
    );

    expect(getByText("#14863E")).toBeTruthy();
  });

  it("should handle dark colors", () => {
    jest.spyOn(RN, "useColorScheme").mockReturnValue("dark");

    const { getByText } = render(
      <ColorsProvider>
        <MockComponent />
      </ColorsProvider>
    );

    expect(getByText("#14863E")).toBeTruthy();
  });

  it("should throw an error if used outside of ColorsProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<MockComponent />)).toThrow();
  });
});
