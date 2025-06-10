import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { useInquiryForm } from "../providers/InquiryFormProvider";

const TestComponent = () => {
  const { isOpen } = useInquiryForm();

  return <Text>{isOpen ? "Active" : "Inactive"}</Text>;
};

describe("InquiryFormProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
