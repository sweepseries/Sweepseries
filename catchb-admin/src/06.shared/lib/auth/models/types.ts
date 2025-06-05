export type UserProfileType = {
  uuid: string;
  name: string;
  email: string;
  profile_image: string;
  color: string;
  mode: "pro" | "normal";
};

export type AnonymousUserType = {
  name: string;
  email: string;
};
