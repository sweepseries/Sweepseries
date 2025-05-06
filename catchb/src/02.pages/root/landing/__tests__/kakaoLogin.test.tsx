import "./__mocks__";
import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import KakaoLogin from "@react-native-kakao/user";
import axios, { AxiosError } from "axios";

import { LandingPage } from "@pages/root/landing";
import {
  sampleKakaoLoginResponse,
  sampleKakaoUserFull,
} from "@features/auth/kakao-login";
import * as AlertAPI from "@shared/lib/alert";
import { sampleLoginData } from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

describe("시작 페이지: 카카오 로그인", () => {
  const showAlertMock = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });

    jest.spyOn(KakaoLogin, "isLogined").mockResolvedValue(false);
    jest.spyOn(KakaoLogin, "login").mockResolvedValue(sampleKakaoLoginResponse);
    jest.spyOn(KakaoLogin, "me").mockResolvedValue(sampleKakaoUserFull);
    jest.spyOn(axios, "post").mockResolvedValue({ data: sampleLoginData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("카카오 초기 로그인 성공하여, 홈 화면으로 이동 (can dismiss)", async () => {
    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("카카오로 로그인"));

    await waitFor(() => {
      expect(Router.router.replace).toHaveBeenCalledWith("/home");
    });
  });

  it("카카오 재로그인 성공하여, 홈 화면으로 이동 (cannot dismiss)", async () => {
    jest.spyOn(KakaoLogin, "isLogined").mockResolvedValue(true);
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(false);

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("카카오로 로그인"));

    await waitFor(() => {
      expect(Router.router.replace).toHaveBeenCalledWith("/home");
    });
  });

  it("서버에 유저 정보가 없다면, signup으로 이동 (with details)", async () => {
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { result: "NOT_REGISTERED" } });

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("카카오로 로그인"));

    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith({
        pathname: "/signup/terms",
        params: {
          mode: "kakao",
          username: sampleKakaoUserFull.id,
          email: sampleKakaoUserFull.email,
          name: sampleKakaoUserFull.name,
          birthday: sampleKakaoUserFull.birthday,
          birthyear: sampleKakaoUserFull.birthyear,
          gender: sampleKakaoUserFull.gender,
          nickname: sampleKakaoUserFull.nickname,
          profileImage: sampleKakaoUserFull.profileImageUrl,
        },
      });
    });
  });

  it("서버에 유저 정보가 없다면, signup으로 이동 (without details)", async () => {
    jest.spyOn(KakaoLogin, "me").mockResolvedValue({
      ...sampleKakaoUserFull,
      id: 1,
      email: "email",
      name: "",
      nickname: "",
      profileImageUrl: "",
      birthday: "",
      birthyear: "",
      gender: "",
    });
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { result: "NOT_REGISTERED" } });

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("카카오로 로그인"));

    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith({
        pathname: "/signup/terms",
        params: {
          mode: "kakao",
          username: sampleKakaoUserFull.id,
          email: sampleKakaoUserFull.email,
          name: "",
          birthday: "",
          birthyear: "",
          gender: "",
          nickname: "",
          profileImage: "",
        },
      });
    });
  });

  it("카카오 서버 로그인 실패: alert 띄우기", async () => {
    jest
      .spyOn(axios, "post")
      .mockRejectedValue(new AxiosError("카카오 로그인 실패", "500"));

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("카카오로 로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "서버 오류",
          message: "로그인 중 서버에 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });
  });

  it("카카오 프로필 조회 실패: alert 띄우기", async () => {
    jest.spyOn(KakaoLogin, "me").mockRejectedValue({});

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("카카오로 로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "카카오 로그인 오류",
          message: "카카오 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });
  });

  it("카카오 로그인 조회 실패: alert 띄우기", async () => {
    jest.spyOn(KakaoLogin, "login").mockRejectedValue({});

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("카카오로 로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "카카오 로그인 오류",
          message: "카카오 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });
  });
});
