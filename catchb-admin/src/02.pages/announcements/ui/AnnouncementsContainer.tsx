import { Route, Routes } from "react-router";

import { AnnouncementsManagementLayout } from "./_layout";
import { AnnouncementDetailsPanel } from "./AnnouncementDetails/AnnouncementDetailsPanel";
import { CreateAnnouncementPanel } from "./CreateAnnouncement/CreateAnnouncementPanel";

export function AnnouncementsContainer() {
  return (
    <Routes>
      <Route element={<AnnouncementsManagementLayout />}>
        <Route index element={null} />
        <Route path="create" element={<CreateAnnouncementPanel />} />
        <Route path=":id" element={<AnnouncementDetailsPanel />} />
      </Route>
    </Routes>
  );
}
