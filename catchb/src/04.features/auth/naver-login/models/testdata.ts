import {
  GetProfileResponse,
  NaverLoginResponse,
} from "@react-native-seoul/naver-login";

export const sampleLoginResponseS: NaverLoginResponse = {
  isSuccess: true,
  successResponse: {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    expiresAtUnixSecondString: "1234567890",
    tokenType: "tokenType",
  },
};

export const sampleLoginResponseF: NaverLoginResponse = {
  isSuccess: true,
  failureResponse: {
    message: "message",
    isCancel: false,
    lastErrorCodeFromNaverSDK: "lastErrorCodeFromNaverSDK",
    lastErrorDescriptionFromNaverSDK: "lastErrorDescriptionFromNaverSDK",
  },
};

export const sampleProfileResponseFull: GetProfileResponse = {
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
};

export const sampleProfileResponsePartial: GetProfileResponse = {
  resultcode: "resultcode",
  message: "message",
  response: {
    id: "id",
    email: "email",
    name: "name",
    nickname: null,
    birthday: null,
    age: null,
    birthyear: null,
    gender: null,
    mobile: null,
    mobile_e164: null,
    profile_image: null,
  },
};
