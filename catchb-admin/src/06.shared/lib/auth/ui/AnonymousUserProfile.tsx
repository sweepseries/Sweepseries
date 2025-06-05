import styled from "styled-components";

import type { AnonymousUserType } from "../models/types";
import { IconWrapper, ProfileContainer, ProfileName } from "./_components";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  user: AnonymousUserType;
}

export function AnonymousUserProfile({ user }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <ProfileContainer>
      <AppIconWrapper>
        <AppIcon icon="user" size={18} color={colors.gray900} />
      </AppIconWrapper>
      <ProfileName>{user.name}</ProfileName>
    </ProfileContainer>
  );
}

const AppIconWrapper = styled(IconWrapper)`
  background-color: ${({ theme }) => theme.colors.gray500};
`;
