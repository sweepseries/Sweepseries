import { Route, Routes } from "react-router";

import { AnnouncementsManagementLayout } from "./_layout";

export function AnnouncementsContainer() {
  return (
    <Routes>
      <Route element={<AnnouncementsManagementLayout />}>
        <Route index element={null} />
      </Route>
    </Routes>
  );
}
