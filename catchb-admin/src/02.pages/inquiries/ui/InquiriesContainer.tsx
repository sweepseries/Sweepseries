import { Route, Routes } from "react-router";

import { InquiriesManagementLayout } from "./_layout";
import { InquiriesDetailPanel } from "./InquiriesDetail/InquiriesDetailPanel";

export function InquiriesContainer() {
  return (
    <Routes>
      <Route element={<InquiriesManagementLayout />}>
        <Route index element={null} />
        <Route path=":id" element={<InquiriesDetailPanel />} />
      </Route>
    </Routes>
  );
}
