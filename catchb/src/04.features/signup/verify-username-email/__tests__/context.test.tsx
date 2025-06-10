import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { useUsernameEmail } from "../providers/UsernameEmailProvider";

const TestComponent = () => {
  const { usernameError } = useUsernameEmail();

  return <Text>{usernameError ? "Active" : "Inactive"}</Text>;
};

describe("UsernameEmailProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
