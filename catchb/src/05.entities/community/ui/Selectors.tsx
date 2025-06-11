import styled, { DefaultTheme } from "styled-components/native";

import { CommunityForumType, CommunityTagType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";
import { MenuSelector } from "@shared/ui/Selectors";

interface ForumProps {
  options: CommunityForumType[];
  selectedForum: CommunityForumType;
  onSelect: (forum: CommunityForumType) => void;
}

export function ForumSelect({
  options,
  selectedForum,
  onSelect,
}: Readonly<ForumProps>) {
  const { colors } = useColors();

  return (
    <MenuSelector
      options={options}
      selected={selectedForum}
      onSelect={onSelect}
      keyExtractor={(forum) => forum.name}
    >
      <MenuItem>
        <MenuItemText>{selectedForum.name}</MenuItemText>
        <AppIcon icon="chevron-down" size={18} color={colors.lowEmphasis} />
      </MenuItem>
    </MenuSelector>
  );
}

interface TagProps {
  options: CommunityTagType[];
  selectedTag: CommunityTagType;
  onSelect: (forum: CommunityTagType) => void;
}

export function TagSelect({
  options,
  selectedTag,
  onSelect,
}: Readonly<TagProps>) {
  const { colors } = useColors();

  return (
    <MenuSelector
      options={options}
      selected={selectedTag}
      onSelect={onSelect}
      keyExtractor={(tag) => tag.name}
    >
      <MenuItem>
        <MenuItemText>{selectedTag.name}</MenuItemText>
        <AppIcon icon="chevron-down" size={18} color={colors.lowEmphasis} />
      </MenuItem>
    </MenuSelector>
  );
}

const MenuItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 92px;
  padding: 4px 8px 4px 12px;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.backgroundGray};
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.backgroundGray};
  font-size: 16px;
`;

const MenuItemText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;
