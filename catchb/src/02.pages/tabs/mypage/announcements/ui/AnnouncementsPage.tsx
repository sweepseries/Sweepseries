import styled, { DefaultTheme } from "styled-components/native";

import { AnnouncementSimple, useAnnouncements } from "@entities/announcements";

export function AnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements();

  if (isLoading || !announcements) {
    return null;
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
