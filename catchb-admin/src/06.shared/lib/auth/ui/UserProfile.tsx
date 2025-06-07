import type { UserProfileType } from "../models/types";
import { ProfileContainer, ProfileName } from "./_components";
import { ProfileImage } from "./ProfileImage";

interface Props {
  user: UserProfileType;
}

export function UserProfile({ user }: Readonly<Props>) {
  return (
    <ProfileContainer>
      <ProfileImage user={user} size={24} />
      <ProfileName>{user.name}</ProfileName>
    </ProfileContainer>
  );
}
