import type { AnonymousUserType } from "../models/types";
import { ProfileContainer, ProfileName } from "./_components";
import { ProfileImage } from "./ProfileImage";

interface Props {
  user: AnonymousUserType;
}

export function AnonymousUserProfile({ user }: Readonly<Props>) {
  return (
    <ProfileContainer>
      <ProfileImage user={user} />
      <ProfileName>{user.name}</ProfileName>
    </ProfileContainer>
  );
}
