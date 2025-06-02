import { useNavigate } from "react-router";

import { useAnnouncementsList } from "../hooks/useAnnouncementsList";
import { AnnouncementSimple } from "@entities/announcements";

export function AnnouncementTableContents() {
  const { announcements } = useAnnouncementsList();
  const navigate = useNavigate();

  const goToDetail = (id: number) => {
    navigate(`/announcements/${id}`);
  };

  return (
    <>
      {announcements.map((announcement) => (
        <button
          key={announcement.id}
          onClick={() => goToDetail(announcement.id)}
          data-testid={`announcement-${announcement.id}`}
        >
          <AnnouncementSimple announcement={announcement} />
        </button>
      ))}
    </>
  );
}
