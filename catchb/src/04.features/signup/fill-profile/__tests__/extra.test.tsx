import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { useProfileForm } from "../provider/ProfileFormProvider";

const TestComponent = () => {
  const { nickname } = useProfileForm();

  return <Text>{nickname}</Text>;
};

describe("ProfileFormProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
