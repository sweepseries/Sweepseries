import { useEffect } from "react";
import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { LoadingAnnouncements } from "./loading";
import { AnnouncementSimple, useAnnouncements } from "@entities/announcements";
import { useAlert } from "@shared/lib/alert";

export function AnnouncementsPage() {
  const { data: announcements, isLoading, isError } = useAnnouncements();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "오류 발생",
        message:
          "약관 목록을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.",
        onConfirm: () => {
          router.back();
        },
      });
      return;
    }
  }, [isError]);

  if (isLoading || !announcements) {
    return <LoadingAnnouncements />;
  }

  return (
    <Container>
      {announcements.map((announcement) => (
        <AnnouncementSimple key={announcement.id} announcement={announcement} />
      ))}
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;
