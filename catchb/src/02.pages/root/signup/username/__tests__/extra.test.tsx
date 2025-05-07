import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { useUsernameEmail } from "../provider/UsernameEmailProvider";

const TestComponent = () => {
  const { isButtonActive } = useUsernameEmail();

  return <Text>{isButtonActive ? "Active" : "Inactive"}</Text>;
};

describe("UsernameEmailProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
