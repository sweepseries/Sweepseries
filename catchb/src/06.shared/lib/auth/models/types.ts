export type CatchBAppModeType = "PRO" | "NORMAL" | "GUEST";

export type UserProfileType = {
  uuid: string;
  name: string;
  email: string;
  profile_image: string | null;
  color: string;
};

type LoginUserDataType = {
  mode: Exclude<CatchBAppModeType, "GUEST">;
} & UserProfileType;

export type LoginData = {
  user: LoginUserDataType;
  access: string;
  refresh: string;
};
