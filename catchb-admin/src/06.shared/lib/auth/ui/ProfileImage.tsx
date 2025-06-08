import styled from "styled-components";

import type { AnonymousUserType, UserProfileType } from "../models/types";
import DefaultProfile from "./files/default_profile.svg?react";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  user: AnonymousUserType | UserProfileType;
  size?: number;
}

export function ProfileImage({ user, size = 24 }: Readonly<Props>) {
  const { colors } = useColors();

  if (!("uuid" in user)) {
    return (
      <AnonymousIconWrapper style={{ width: size, height: size }}>
        <AppIcon icon="user" size={size * 0.75} color={colors.gray900} />
      </AnonymousIconWrapper>
    );
  }

  if (user.profile_image) {
    return (
      <Image
        src={user.profile_image}
        alt={user.name}
        width={size}
        height={size}
      />
    );
  }

  return (
    <IconWrapper style={{ backgroundColor: user.color }}>
      <DefaultProfile width={size * 0.9} height={size * 0.9} />
    </IconWrapper>
  );
}

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const AnonymousIconWrapper = styled(IconWrapper)`
  background-color: ${({ theme }) => theme.colors.gray500};
`;

const Image = styled.img`
  border-radius: 50%;
  margin-right: 1rem;
`;
