export type RegisterDataType = {
  mode: string;
  username: string;
  email: string;
  name: string;
  phone: string;
  notifications: boolean;
  password?: string;
  password2?: string;
  birth_year?: string;
  birth_month?: string;
  birth_day?: string;
  gender?: string | null;
  nickname?: string | null;
  profile_image?: string;
};
