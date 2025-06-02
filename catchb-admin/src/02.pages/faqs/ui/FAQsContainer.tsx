import { Route, Routes } from "react-router";

import { FAQsManagementLayout } from "./_layout";

export function FAQsContainer() {
  return (
    <Routes>
      <Route element={<FAQsManagementLayout />}>
        <Route index element={null} />
      </Route>
    </Routes>
  );
}
