import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { AnnouncementType } from "../models/types";
import { Divider } from "@shared/ui/Dividers";

interface AnnouncementSimpleProps {
  announcement: AnnouncementType;
}

export function AnnouncementSimple({
  announcement,
}: Readonly<AnnouncementSimpleProps>) {
  const goToDetailPage = () => {
    router.push(`/mypage/announcements/${announcement.id}`);
  };

  return (
    <Container>
      <Wrapper
        onPress={goToDetailPage}
        testID={`announcement-${announcement.id}`}
      >
        <Title>{announcement.title}</Title>
        <Date>{announcement.created_at}</Date>
      </Wrapper>
      <Divider />
    </Container>
  );
}

const Container = styled.View`
  padding: 16px 0 0 0;
  gap: 16px;
`;

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const Title = styled.Text`
  flex: 1;
`;

const Date = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
  font-size: 12px;
`;
