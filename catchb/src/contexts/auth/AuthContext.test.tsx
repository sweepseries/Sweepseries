import { TouchableOpacity } from "react-native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { AuthProvider, useAuth } from "./AuthContext";
import * as SecureStore from "@services/storage";

jest.unmock("@contexts/auth");

const testResponse = {
  access: "1234",
  refresh: "5678",
};

const TestComponent = () => {
  const { login, socialLogin, logout } = useAuth();

  const handleLogin = () => {
    login("normal", "1234");
  };

  const handleSocialLogin = () => {
    socialLogin("social");
  };

  return (
    <>
      <TouchableOpacity onPress={handleLogin} testID="login" />
      <TouchableOpacity onPress={handleSocialLogin} testID="social-login" />
      <TouchableOpacity onPress={logout} testID="logout" />
    </>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: testResponse });
  });

  it("provides auth context correctly and handles login (pro), logout", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(getByTestId("login"));
    fireEvent.press(getByTestId("logout"));
  });

  it("handles social login success", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(getByTestId("social-login"));
  });

  it("handles social login redirect", () => {
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { result: "not_registered" } });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(getByTestId("social-login"));
  });

  it("handles login fail", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ status: 400 });
    jest.spyOn(SecureStore, "getSecure").mockRejectedValue(null);

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("login"));
      fireEvent.press(getByTestId("social-login"));
      fireEvent.press(getByTestId("logout"));
    });
  });

  it("handles error correctly", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});

describe("Axios Interceptor", () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(SecureStore, "getSecure").mockResolvedValue("1234");
    mock.reset();
  });

  it("should retry the request after refreshing the token", async () => {
    // Mock a request that initially fails with 403 and "token_not_valid" error
    mock.onGet("/test-endpoint").replyOnce(403, { code: "token_not_valid" });
    jest.spyOn(axios, "post").mockResolvedValue({ data: testResponse });

    // After refreshing the token, the request should succeed
    mock.onGet("/test-endpoint").reply(200, { data: "success" });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Perform a GET request that should trigger the interceptor
    await waitFor(async () => {
      await axios.get("/test-endpoint");
    });
  });

  it("token refresh fail", async () => {
    // Mock a request that initially fails with 403 and "token_not_valid" error
    mock.onGet("/test-endpoint").replyOnce(403, { code: "token_not_valid" });
    jest.spyOn(axios, "post").mockResolvedValue({ status: 400 });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Perform a GET request that should trigger the interceptor
    await waitFor(async () => {
      await axios.get("/test-endpoint");
    });
  });

  it("should not refresh if response is not token_not_valid", async () => {
    // Mock a request that initially fails with 403 and "token_not_valid" error
    mock.onGet("/test-endpoint").replyOnce(400);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Perform a GET request that should trigger the interceptor
    await waitFor(async () => {
      await axios.get("/test-endpoint");
    });
  });
});
