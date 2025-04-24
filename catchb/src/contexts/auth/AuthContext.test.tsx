import { TouchableOpacity } from "react-native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as Router from "expo-router";

import { AuthProvider, useAuth } from "./AuthContext";
import * as CatchBAuthAPIs from "@services/auth/auth";
import * as SocialAuthAPIs from "@services/auth/sociallogin";

jest.unmock("@contexts/auth");

const TestComponent = () => {
  const { catchBLogin, kakaoLogin, naverLogin, logout } = useAuth();

  return (
    <>
      <TouchableOpacity
        onPress={() => catchBLogin("user", "1234")}
        testID="catchb-login"
      />
      <TouchableOpacity onPress={kakaoLogin} testID="kakao-login" />
      <TouchableOpacity onPress={naverLogin} testID="naver-login" />
      <TouchableOpacity onPress={logout} testID="logout" />
    </>
  );
};

describe("AuthProvider", () => {
  const testResponse = {
    uuid: "1234",
    mode: "pro",
    access: "access_token",
    refresh: "refresh_token",
  };
  const sampleProfile = {
    id: "1234",
    name: "",
    email: "",
    birthday: "",
    birthyear: "",
    gender: "",
    nickname: "",
    profileImageUrl: "",
    profile_image: "",
  };

  beforeEach(() => {
    jest.spyOn(CatchBAuthAPIs, "refresh").mockResolvedValue(null); // default auto login
  });

  it("handles catchb login (pro)", async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    jest.spyOn(CatchBAuthAPIs, "login").mockResolvedValueOnce(null);
    await waitFor(() => {
      fireEvent.press(getByTestId("catchb-login"));
    });

    jest
      .spyOn(CatchBAuthAPIs, "login")
      .mockResolvedValue({ data: testResponse });
    jest.spyOn(CatchBAuthAPIs, "logout").mockResolvedValueOnce(false);
    await waitFor(() => {
      fireEvent.press(getByTestId("catchb-login"));
      fireEvent.press(getByTestId("logout"));
    });

    jest.spyOn(CatchBAuthAPIs, "logout").mockResolvedValue(true);
    await waitFor(() => {
      fireEvent.press(getByTestId("logout"));
    });
  });

  it("handles kakao login", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    jest.spyOn(SocialAuthAPIs, "kakaoLogin").mockResolvedValueOnce(null);
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(true);
    waitFor(() => {
      fireEvent.press(getByTestId("kakao-login"));
    });

    jest.spyOn(SocialAuthAPIs, "kakaoLogin").mockResolvedValueOnce({
      result: "REDIRECT",
      initialProfile: sampleProfile,
    });
    waitFor(() => {
      fireEvent.press(getByTestId("kakao-login"));
    });

    jest
      .spyOn(SocialAuthAPIs, "kakaoLogin")
      .mockResolvedValueOnce(testResponse);
    waitFor(() => {
      fireEvent.press(getByTestId("kakao-login"));
    });
  });

  it("handles naver login", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    jest.spyOn(SocialAuthAPIs, "naverLogin").mockResolvedValue(null);
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(false);
    waitFor(() => {
      fireEvent.press(getByTestId("naver-login"));
    });

    jest.spyOn(SocialAuthAPIs, "naverLogin").mockResolvedValue({
      result: "REDIRECT",
      initialProfile: { ...sampleProfile },
    });
    waitFor(() => {
      fireEvent.press(getByTestId("naver-login"));
    });

    jest.spyOn(SocialAuthAPIs, "naverLogin").mockResolvedValue({
      result: "REDIRECT",
      initialProfile: {
        id: "1234",
        name: "",
        email: "",
      },
    });
    waitFor(() => {
      fireEvent.press(getByTestId("naver-login"));
    });

    jest.spyOn(SocialAuthAPIs, "naverLogin").mockResolvedValue({
      data: testResponse,
    });
    waitFor(() => {
      fireEvent.press(getByTestId("naver-login"));
    });
  });

  it("handles auto login success (dismiss all = true)", () => {
    jest.spyOn(CatchBAuthAPIs, "refresh").mockResolvedValue(testResponse);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  it("handles auto login success (dismiss all = false)", () => {
    jest.spyOn(CatchBAuthAPIs, "refresh").mockResolvedValue(testResponse);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  it("handles error correctly", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});

describe("Axios Interceptor", () => {
  const testResponse = {
    uuid: "1234",
    mode: "pro",
    access: "access_token",
    refresh: "refresh_token",
  };

  const mock = new MockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
    mock.reset();
  });

  it("should retry the request after refreshing the token", async () => {
    // Mock a request that initially fails with 403 and "token_not_valid" error
    mock.onGet("/test-endpoint").replyOnce(403, { code: "token_not_valid" });
    jest
      .spyOn(CatchBAuthAPIs, "refresh")
      .mockResolvedValue({ data: testResponse });

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
    jest.spyOn(CatchBAuthAPIs, "refresh").mockResolvedValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Perform a GET request that should trigger the interceptor
    await waitFor(async () => {
      try {
        await axios.get("/test-endpoint");
      } catch {
        // This catch block is to not raise error in the test
      }
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
      try {
        await axios.get("/test-endpoint");
      } catch {
        // This catch block is to not raise error in the test
      }
    });
  });
});
