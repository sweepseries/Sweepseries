import styled from "styled-components";

import type { UserProfileType } from "../models/types";
import DefaultProfile from "./files/default_profile.svg?react";
import { IconWrapper, ProfileContainer, ProfileName } from "./_components";

interface Props {
  user: UserProfileType;
}

export function UserProfile({ user }: Readonly<Props>) {
  return (
    <ProfileContainer>
      {user.profile_image ? (
        <ProfileImage src={user.profile_image} alt={user.name} />
      ) : (
        <IconWrapper style={{ backgroundColor: user.color }}>
          <DefaultProfile width={20} height={20} />
        </IconWrapper>
      )}
      <ProfileName>{user.name}</ProfileName>
    </ProfileContainer>
  );
}

const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 16px;
`;
