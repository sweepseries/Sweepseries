import { Text, View } from "react-native";
import { fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios";

import { useRegister } from "@shared/lib/signup/";
import { renderWithProviders } from "@test-utils/renderer";

const MockRegisterComponent = () => {
  const { mutate, isSuccess } = useRegister();

  const handleRegister = () => {
    mutate({
      mode: "catchb",
      username: "testuser",
      email: "em@ail.com",
      name: "Test User",
      phone: "1234567890",
      notifications: true,
    });
  };

  return (
    <View>
      <Text onPress={handleRegister}>Register User</Text>
      {isSuccess && <Text>User Registered Successfully</Text>}
    </View>
  );
};

describe("User Registration API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should register a user", async () => {
    const mockResponse = {
      data: null,
    };

    jest.spyOn(axios, "post").mockResolvedValueOnce(mockResponse);

    const { getByText } = renderWithProviders(<MockRegisterComponent />);

    fireEvent.press(getByText("Register User"));

    await waitFor(() => {
      expect(getByText("User Registered Successfully")).toBeTruthy();
    });
  });
});
