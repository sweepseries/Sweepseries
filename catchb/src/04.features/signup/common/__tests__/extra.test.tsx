import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { useSignup } from "../provider/SignupProvider";

const TestComponent = () => {
  const { data } = useSignup();

  return <Text>{data.mode}</Text>;
};

describe("SignupProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
