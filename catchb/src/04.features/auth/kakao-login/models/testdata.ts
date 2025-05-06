import { KakaoLoginToken, KakaoUser } from "@react-native-kakao/user";

export const sampleKakaoLoginResponse: KakaoLoginToken = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  accessTokenExpiresAt: 1234567890,
  refreshTokenExpiresAt: 1234567890,
  accessTokenExpiresIn: 1234567890,
  refreshTokenExpiresIn: 1234567890,
  scopes: ["scopes"],
};

export const sampleKakaoUserFull: KakaoUser = {
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
};
