import { Route, Routes } from "react-router";

import { InquiriesManagementLayout } from "./_layout";

export function InquiriesContainer() {
  return (
    <Routes>
      <Route element={<InquiriesManagementLayout />}>
        <Route index element={null} />
        <Route path=":id" element={null} />
      </Route>
    </Routes>
  );
}
