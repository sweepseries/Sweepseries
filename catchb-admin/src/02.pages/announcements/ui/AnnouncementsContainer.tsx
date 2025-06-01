import { Route, Routes } from "react-router";

import { AnnouncementsManagementLayout } from "./_layout";
import { CreateAnnouncementPanel } from "./CreateAnnouncement/CreateAnnouncementPanel";

export function AnnouncementsContainer() {
  return (
    <Routes>
      <Route element={<AnnouncementsManagementLayout />}>
        <Route index element={null} />
        <Route path="create" element={<CreateAnnouncementPanel />} />
      </Route>
    </Routes>
  );
}
