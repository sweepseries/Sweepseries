import { TouchableOpacity } from "react-native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { AutoLoginProvider } from "../autologin/AutoLoginProvider";
import * as AlertAPI from "@shared/lib/alert";
import { sampleLoginData } from "@shared/lib/auth";
import * as SecureAPI from "@shared/lib/storage";

const TestComponent = () => {
  const getRequestTester = async () => {
    try {
      await axios.get("/test");
    } catch {
      // Handle error in test
    }
  };

  return <TouchableOpacity onPress={getRequestTester} testID="test-request" />;
};

const renderProvider = () => {
  return render(
    <AutoLoginProvider>
      <></>
    </AutoLoginProvider>
  );
};

const renderTokenRefreshTester = () => {
  return render(
    <AlertAPI.AlertProvider>
      <AutoLoginProvider>
        <TestComponent />
      </AutoLoginProvider>
    </AlertAPI.AlertProvider>
  );
};

describe("AutoLoginProvider", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(true);
    jest.spyOn(SecureAPI, "getSecure").mockResolvedValue("refreshToken");
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    mockAxios.reset();
    mockAxios.onPost("/api/v1/tokens/refresh/").reply(200, sampleLoginData);
  });

  it("handles auto login correctly", () => {
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(false);

    renderProvider();
  });

  it("handles no refresh token in secure storage", () => {
    jest.spyOn(SecureAPI, "getSecure").mockResolvedValue(null);

    renderProvider();
  });

  it("handles auto token renew interceptor: success", async () => {
    const { getByTestId } = renderTokenRefreshTester();

    mockAxios
      .onGet("/test")
      .replyOnce(401, { error: "Access Token이 만료되었습니다." }); // 1차 실패
    mockAxios.onGet("/test").reply(200, {}); // 토큰 갱신 후 성공
    await waitFor(() => {
      fireEvent.press(getByTestId("test-request"));
    });
  });

  it("handles auto token renew interceptor: fail", async () => {
    const { getByTestId } = renderTokenRefreshTester();

    mockAxios
      .onGet("/test")
      .replyOnce(401, { error: "Access Token이 만료되었습니다." });
    mockAxios.onPost("/api/v1/tokens/refresh/").reply(400, {});
    await waitFor(() => {
      fireEvent.press(getByTestId("test-request"));
    });
  });
});
