import { Route, Routes } from "react-router";

import { FAQsManagementLayout } from "./_layout";
import { CreateFAQPanel } from "./CreateFAQ/CreateFAQPanel";
import { EditFAQPanel } from "./EditFAQ/EditFAQPanel";
import { FAQDetailsPanel } from "./FAQDetails/FAQDetailsPanel";

export function FAQsContainer() {
  return (
    <Routes>
      <Route element={<FAQsManagementLayout />}>
        <Route index element={null} />
        <Route path="create" element={<CreateFAQPanel />} />
        <Route path=":id" element={<FAQDetailsPanel />} />
        <Route path=":id/edit" element={<EditFAQPanel />} />
      </Route>
    </Routes>
  );
}
