import { LoginData, UserProfileType } from "./types";

export const sampleUserProfile: UserProfileType = {
  uuid: "12345",
  name: "John Doe",
  email: "john@doe.com",
  profile_image: "https://example.com/profile.jpg",
};

export const sampleLoginData: LoginData = {
  user: {
    ...sampleUserProfile,
    mode: "PRO",
  },
  access: "access",
  refresh: "refresh",
};
