import { LoginData, UserProfileType } from "./types";

export const sampleUserProfile: UserProfileType = {
  uuid: "12345",
  name: "John Doe",
  profileImage: "https://example.com/profile.jpg",
};

export const sampleLoginData: LoginData = {
  user: {
    ...sampleUserProfile,
    mode: "PRO",
  },
  access: "access",
  refresh: "refresh",
};
