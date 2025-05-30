import styled from "styled-components";

import type { AdminCatchBAnnouncementsType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  announcement: AdminCatchBAnnouncementsType;
}

export function AnnouncementSimple({ announcement }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <AnnouncementRow>
      <IndexColumn>{announcement.id}</IndexColumn>
      <TitleColumn>
        {announcement.is_important && <AppIcon icon="pin" size={16} />}
        {announcement.title}
      </TitleColumn>
      <ChipColumn>
        {announcement.is_deleted ? (
          <TextChip label="삭제됨" color={colors.gray900} />
        ) : (
          <TextChip label="유효" color={colors.success} />
        )}
      </ChipColumn>
      <DateColumn>
        {new Date(announcement.created_at).toLocaleDateString()}
      </DateColumn>
      <DateColumn>
        {new Date(announcement.updated_at).toLocaleDateString()}
      </DateColumn>
    </AnnouncementRow>
  );
}

const AnnouncementRow = styled.div`
  display: flex;
  align-items: center;

  font-size: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
`;

const TableData = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  height: 36px;

  color: ${({ theme }) => theme.colors.text700};
  border-left: 1px solid ${({ theme }) => theme.colors.gray700};

  white-space: nowrap;
  overflow: hidden;
`;

const IndexColumn = styled(TableData)`
  width: 3rem;
  border-left: none;
`;

const TitleColumn = styled(TableData)`
  flex: 1;
  max-width: 20rem;
  gap: 0.25rem;
`;

const ChipColumn = styled(TableData)`
  width: 4rem;
  border-left: 1px solid ${({ theme }) => theme.colors.gray700};
`;

const DateColumn = styled(TableData)`
  width: 6rem;
`;
