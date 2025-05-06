import "./__mocks__";
import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import NaverLogin from "@react-native-seoul/naver-login";
import axios, { AxiosError } from "axios";

import { LandingPage } from "@pages/root/landing";
import {
  sampleLoginResponseF,
  sampleLoginResponseS,
  sampleProfileResponseFull,
  sampleProfileResponsePartial,
} from "@features/auth/naver-login";
import * as AlertAPI from "@shared/lib/alert";
import { sampleLoginData } from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

describe("시작 페이지: 네이버 로그인", () => {
  const showAlertMock = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });

    jest.spyOn(NaverLogin, "login").mockResolvedValue(sampleLoginResponseS);
    jest
      .spyOn(NaverLogin, "getProfile")
      .mockResolvedValue(sampleProfileResponseFull);
    jest.spyOn(axios, "post").mockResolvedValue({ data: sampleLoginData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("네이버 로그인 성공하여, 홈 화면으로 이동 (can dismiss)", async () => {
    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("네이버로 로그인"));

    await waitFor(() => {
      expect(Router.router.replace).toHaveBeenCalledWith("/home");
    });
  });

  it("네이버 로그인 성공하여, 홈 화면으로 이동 (cannot dismiss)", async () => {
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(false);

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("네이버로 로그인"));

    await waitFor(() => {
      expect(Router.router.replace).toHaveBeenCalledWith("/home");
    });
  });

  it("서버에 유저 정보가 없다면 signup으로 이동 with details", async () => {
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { result: "NOT_REGISTERED" } });

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("네이버로 로그인"));

    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith({
        pathname: "/signup/terms",
        params: {
          mode: "naver",
          username: sampleProfileResponseFull.response.id,
          email: sampleProfileResponseFull.response.email,
          name: sampleProfileResponseFull.response.name,
          phone: "",
          birthday: sampleProfileResponseFull.response.birthday,
          birthyear: sampleProfileResponseFull.response.birthyear,
          gender: sampleProfileResponseFull.response.gender,
          nickname: sampleProfileResponseFull.response.nickname,
          profileImage: sampleProfileResponseFull.response.profile_image,
        },
      });
    });
  });

  it("서버에 유저 정보가 없다면 signup으로 이동 without details", async () => {
    jest
      .spyOn(NaverLogin, "getProfile")
      .mockResolvedValue(sampleProfileResponsePartial);
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { result: "NOT_REGISTERED" } });

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("네이버로 로그인"));

    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith({
        pathname: "/signup/terms",
        params: {
          mode: "naver",
          username: sampleProfileResponsePartial.response.id,
          email: sampleProfileResponsePartial.response.email,
          name: sampleProfileResponsePartial.response.name,
          phone: "",
          birthday: "",
          birthyear: "",
          gender: "",
          nickname: "",
          profileImage: "",
        },
      });
    });
  });

  it("네이버 서버 프로필 조회 실패: alert를 띄운다", async () => {
    jest.spyOn(NaverLogin, "getProfile").mockRejectedValue({});

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("네이버로 로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "네이버 로그인 오류",
          message: "네이버 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });
  });

  it("네이버 서버 로그인 실패: alert를 띄운다", async () => {
    jest.spyOn(NaverLogin, "login").mockResolvedValue(sampleLoginResponseF);

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("네이버로 로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "네이버 로그인 오류",
          message: "네이버 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });
  });

  it("캐치비 서버 로그인 실패: alert를 띄운다", async () => {
    jest
      .spyOn(axios, "post")
      .mockRejectedValue(new AxiosError("Network Error", "ERR_NETWORK"));

    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("네이버로 로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "오류 발생",
          message: "서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });
  });

  it("네이버 로그인 모듈을 통해 로그인 시도 실패: alert를 띄운다", async () => {
    jest.spyOn(NaverLogin, "login").mockResolvedValue({
      isSuccess: false,
    });
    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("네이버로 로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "네이버 로그인 오류",
          message: "네이버 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });
  });
});
