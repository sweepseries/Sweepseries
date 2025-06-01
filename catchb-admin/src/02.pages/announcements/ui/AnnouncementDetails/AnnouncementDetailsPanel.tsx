import styled from "styled-components";

import { AnnouncementDetailsLoading } from "./_loading";
import {
  ModalInnerContainer,
  ModalContentVertical,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import {
  AnnouncementContents,
  AnnouncementDetailsProvider,
  useAnnouncementDetails,
} from "@features/announcements/announcement-details";
import { DeleteAnnouncementButton } from "@features/announcements/delete-announcement";
import { EditAnnouncementButton } from "@features/announcements/edit-announcement";
import { ReactivateAnnouncementButton } from "@features/announcements/reactivate-announcement";
import { AppIcon } from "@shared/ui/Icons";

export function AnnouncementDetailsPanel() {
  return (
    <AnnouncementDetailsProvider>
      <Components />
    </AnnouncementDetailsProvider>
  );
}

function Components() {
  const { announcementDetails, isLoading } = useAnnouncementDetails();

  if (isLoading) {
    return <AnnouncementDetailsLoading />;
  }

  if (!announcementDetails) return null;

  return (
    <ModalInnerContainer>
      <ModalContentVertical>
        <Header>
          <Title>
            {announcementDetails.is_important && (
              <AppIcon icon="pin" size={18} />
            )}
            {announcementDetails.title}
          </Title>
          {announcementDetails.is_deleted ? (
            <ReactivateAnnouncementButton
              announcementId={announcementDetails.id}
            />
          ) : (
            <div>
              <EditAnnouncementButton announcementId={announcementDetails.id} />
              <DeleteAnnouncementButton
                announcementId={announcementDetails.id}
              />
            </div>
          )}
        </Header>
        <AnnouncementContents announcement={announcementDetails} />
      </ModalContentVertical>
    </ModalInnerContainer>
  );
}

const Title = styled(ModalTitle)`
  align-items: center;
  gap: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 1rem;

  > div:last-child {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
