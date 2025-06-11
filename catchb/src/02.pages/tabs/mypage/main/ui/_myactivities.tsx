import { router } from "expo-router";
import styled from "styled-components/native";

import { UserProfileCard } from "@entities/users";
import { useAuth } from "@shared/lib/auth";
import { LoginNeeded } from "@shared/ui/Fallbacks";

export function MyActivities() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return <LoginNeeded />;

  const goToProfileEditPage = () => {
    router.push("/mypage/profile");
  };

  return (
    <Container>
      <UserProfileCard profile={user} editPress={goToProfileEditPage} />
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;
