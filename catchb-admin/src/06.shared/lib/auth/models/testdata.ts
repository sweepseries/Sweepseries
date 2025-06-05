import type { UserProfileType } from "./types";

export const sampleUserProfile: UserProfileType = {
  uuid: "123e4567-e89b-12d3-a456-426614174000",
  name: "John Doe",
  email: "john@doe.com",
  profile_image: "https://example.com/profile.jpg",
  color: "#3498db",
  mode: "normal",
};

export const sampleAnonymousUserProfile = {
  name: "Anonymous User",
  email: "anonymous@user.com",
};
