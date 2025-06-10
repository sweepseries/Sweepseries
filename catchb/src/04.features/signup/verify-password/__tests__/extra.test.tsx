import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { usePasswordVerification } from "../providers/PasswordsProvider";

const TestComponent = () => {
  const { password } = usePasswordVerification();

  return <Text>{password ? "Active" : "Inactive"}</Text>;
};

describe("PasswordVerificationProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
