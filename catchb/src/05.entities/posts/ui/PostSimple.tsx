import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import styled, { DefaultTheme } from "styled-components/native";

import { PostSimpleType } from "../models/types";
import {
  CommunityProfile,
  CommunityStat,
  CommunityTag,
} from "@entities/community/@x/post";
import { ThemeColorType, useColors } from "@shared/lib/colors";
import { formatTimeSince } from "@shared/lib/datetime";
import { TruncatedText } from "@shared/ui/Texts";

interface Props {
  post: PostSimpleType;
}

export function PostSimple({ post }: Readonly<Props>) {
  const { colors } = useColors();
  const styles = contentStyles(colors);

  return (
    <Container>
      <CommunityTag tag={post.tag} />
      <HorizontalWrapper>
        <VerticalWrapper>
          <TruncatedText text={post.title} style={styles.title} />
          <TruncatedText
            text={post.content}
            numberOfLines={3}
            style={styles.content}
          />
        </VerticalWrapper>
        {post.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.image}
            contentFit="cover"
          />
        )}
      </HorizontalWrapper>
      <DateText>
        {formatTimeSince(new Date(post.created_at))}
        {post.is_updated && "*"}
      </DateText>
      <Footer>
        <ProfileWrapper>
          <CommunityProfile profile={post.author} size={24} />
          <Nickname>{post.author.name}</Nickname>
        </ProfileWrapper>
        <StatsWrapper>
          <CommunityStat icon="eye" value={post.num_views} />
          <CommunityStat icon="heart" value={post.num_likes} />
          <CommunityStat icon="comment" value={post.num_comments} />
        </StatsWrapper>
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  padding: 8px 0;
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
  gap: 8px;
`;

const VerticalWrapper = styled.View`
  flex: 1;
  gap: 4px;
`;

const DateText = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.backgroundGray};
`;

const ProfileWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Nickname = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const StatsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const contentStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.highEmphasis,
    },
    content: {
      fontSize: 14,
      lineHeight: 20,
      color: colors.mediumEmphasis,
    },
    image: {
      width: 92,
      height: 92,
      borderRadius: 8,
    },
  });
