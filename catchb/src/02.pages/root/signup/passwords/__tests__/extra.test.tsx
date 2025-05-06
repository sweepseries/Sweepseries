import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { usePasswordVerification } from "../provider/PasswordsProvider";

const TestComponent = () => {
  const { isButtonActive } = usePasswordVerification();

  return <Text>{isButtonActive ? "Active" : "Inactive"}</Text>;
};

describe("PasswordVerificationProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
