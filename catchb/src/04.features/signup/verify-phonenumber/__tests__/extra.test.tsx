import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { usePhoneVerification } from "../provider/PhoneVerificationProvider";

const TestComponent = () => {
  const { sent } = usePhoneVerification();

  return <Text>{sent ? "Active" : "Inactive"}</Text>;
};

describe("PhoneVerificationProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
