import axios from "axios";
import KakaoLogin from "@react-native-kakao/user";
import NaverLogin from "@react-native-seoul/naver-login";

import { kakaoLogin, naverLogin } from "./sociallogin";

describe("kakaoLogin", () => {
  beforeEach(() => {
    jest.spyOn(KakaoLogin, "isLogined").mockResolvedValue(true);
    jest.spyOn(KakaoLogin, "me").mockResolvedValue({
      id: 1,
      email: "email",
      name: "name",
      nickname: "nickname",
      profileImageUrl: "profile_image",
      thumbnailImageUrl: "thumbnail_image",
      phoneNumber: "phone_number",
      ageRange: "age_range",
      birthday: "birthday",
      birthdayType: "birthday_type",
      birthyear: "2000",
      gender: "gender",
      isEmailValid: true,
      isEmailVerified: true,
      isKorean: true,
    });
    jest.spyOn(axios, "post").mockResolvedValue({ data: { user: "USER" } });
  });

  it("should successfully login with Kakao (existing user)", async () => {
    const result = await kakaoLogin();

    expect(result).toEqual({ user: "USER" });
  });

  it("should successfully login with Kakao (new user)", async () => {
    jest.spyOn(KakaoLogin, "isLogined").mockResolvedValue(false);
    jest.spyOn(KakaoLogin, "login").mockResolvedValue({
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      accessTokenExpiresAt: 1234567890,
      refreshTokenExpiresAt: 1234567890,
      accessTokenExpiresIn: 1234567890,
      refreshTokenExpiresIn: 1234567890,
      scopes: ["scopes"],
    });

    const result = await kakaoLogin();

    expect(result).toEqual({user: "USER"});
  });

  it("should redirect with Kakao (new user)", async () => {
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { result: "NOT_REGISTERED" } });

    const result = await kakaoLogin();

    expect(result.result).toEqual("REDIRECT");
  });

  it("should handle unexpected Kakao error", async () => {
    jest.spyOn(KakaoLogin, "isLogined").mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    const result = await kakaoLogin();

    expect(result).toEqual(null);
  });
});

describe("naverLogin", () => {
  beforeEach(() => {
    jest.spyOn(NaverLogin, "login").mockResolvedValue({
      isSuccess: true,
      successResponse: {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        expiresAtUnixSecondString: "1234567890",
        tokenType: "tokenType",
      },
    });
    jest.spyOn(NaverLogin, "getProfile").mockResolvedValue({
      resultcode: "resultcode",
      message: "message",
      response: {
        id: "id",
        nickname: "nickname",
        email: "email",
        name: "name",
        birthday: "birthday",
        age: "age",
        birthyear: 2000,
        gender: "gender",
        mobile: "mobile",
        mobile_e164: "mobile_e164",
        profile_image: "profile_image",
      },
    });
    jest.spyOn(axios, "post").mockResolvedValue({ data: { user: "USER" } });
  });

  it("should successfully login with Naver(existing user)", async () => {
    const result = await naverLogin();

    expect(result).toEqual({ user: "USER" });
  });

  it("should handle naver login fail", async () => {
    jest.spyOn(NaverLogin, "login").mockResolvedValue({
      isSuccess: false,
    });

    const result = await naverLogin();

    expect(result).toEqual(null);
  });

  it("should redirect with Naver", async () => {
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { result: "NOT_REGISTERED" } });

    const result = await naverLogin();

    expect(result.result).toEqual("REDIRECT");
  });

  it("should handle unexpected Naver error", async () => {
    jest.spyOn(NaverLogin, "login").mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    const result = await naverLogin();

    expect(result).toEqual(null);
  });

  it("should handle bad response from server", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(null);

    const result = await naverLogin();

    expect(result).toEqual(null);
  });
});
