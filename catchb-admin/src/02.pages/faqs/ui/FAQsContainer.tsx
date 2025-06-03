import { Route, Routes } from "react-router";

import { FAQsManagementLayout } from "./_layout";
import { FAQDetailsPanel } from "./FAQDetails/FAQDetailsPanel";

export function FAQsContainer() {
  return (
    <Routes>
      <Route element={<FAQsManagementLayout />}>
        <Route index element={null} />
        <Route path=":id" element={<FAQDetailsPanel />} />
      </Route>
    </Routes>
  );
}
