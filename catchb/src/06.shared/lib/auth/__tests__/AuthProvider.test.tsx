import { Text, TouchableOpacity, View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import { sampleLoginData } from "../models/testdata";
import { AuthProvider, useAuth } from "@shared/lib/auth";

const MockComponent = () => {
  const { user, mode, isAuthenticated, saveLoginStatus, resetLoginStatus } =
    useAuth();

  return (
    <View>
      <Text>{`User: ${user ? user.name : "No user"}`}</Text>
      <Text>{`Mode: ${mode}`}</Text>
      <Text>{`Is Authenticated: ${isAuthenticated}`}</Text>
      <TouchableOpacity
        onPress={() => saveLoginStatus(sampleLoginData)}
        testID="login"
      />
      <TouchableOpacity onPress={resetLoginStatus} testID="logout" />
    </View>
  );
};

describe("AuthProvider", () => {
  it("test initial state", () => {
    const { getByText } = render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    expect(getByText("User: No user")).toBeTruthy();
    expect(getByText("Mode: GUEST")).toBeTruthy();
    expect(getByText("Is Authenticated: false")).toBeTruthy();
  });

  it("test state after login and logout", () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    fireEvent.press(getByTestId("login"));

    // Test after login
    expect(getByText("User: John Doe")).toBeTruthy();
    expect(getByText("Mode: PRO")).toBeTruthy();
    expect(getByText("Is Authenticated: true")).toBeTruthy();

    fireEvent.press(getByTestId("logout"));

    // Test after logout
    expect(getByText("User: No user")).toBeTruthy();
    expect(getByText("Mode: GUEST")).toBeTruthy();
    expect(getByText("Is Authenticated: false")).toBeTruthy();
  });

  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<MockComponent />)).toThrow();
  });
});
